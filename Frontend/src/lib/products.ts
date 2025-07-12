import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  DocumentData,
  doc,
  updateDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { getUserProfile } from './users';

export interface Product {
  id?: string;
  title: string;
  description: string;
  size: string;
  condition: string;
  category: string;
  pointsValue: number;
  imageUrls: string[];
  userId: string;
  userName?: string; // Optional, can be fetched from user profile
  userEmail: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductFormData {
  title: string;
  description: string;
  size: string;
  condition: string;
  category: string;
  pointsValue: number;
  images: File[];
}

// Upload images to Firebase Storage
export const uploadProductImages = async (images: File[], productId: string): Promise<string[]> => {
  try {
    console.log(`🔄 Starting upload of ${images.length} images for product ${productId}`);
    
    if (!images || images.length === 0) {
      console.log('⚠️ No images to upload');
      return [];
    }
    
    const uploadPromises = images.map(async (image, index) => {
      try {
        // Validate image file
        if (!image || !image.type.startsWith('image/')) {
          throw new Error(`File ${index + 1} is not a valid image`);
        }
        
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const fileExtension = image.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `img_${timestamp}_${randomId}.${fileExtension}`;
        
        // Create reference with public path structure
        const imageRef = ref(storage, `public/products/${productId}/${fileName}`);
        
        console.log(`📤 Uploading image ${index + 1}/${images.length}: ${fileName}`);
        console.log(`📊 File size: ${(image.size / 1024 / 1024).toFixed(2)}MB`);
        console.log(`📂 Storage path: public/products/${productId}/${fileName}`);
        
        // Add metadata for better management
        const metadata = {
          contentType: image.type,
          customMetadata: {
            productId: productId,
            uploadedAt: new Date().toISOString(),
          }
        };
        
        // Upload the file with metadata
        const snapshot = await uploadBytes(imageRef, image, metadata);
        console.log(`✅ Upload completed for ${fileName}`);
        
        // Get the download URL - this should be publicly accessible
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(`🔗 Download URL obtained: ${downloadURL}`);
        
        // Verify the URL is accessible by testing it
        try {
          const response = await fetch(downloadURL, { method: 'HEAD' });
          if (response.ok) {
            console.log(`✅ Image URL verified accessible: ${downloadURL}`);
          } else {
            console.warn(`⚠️ Image URL might not be publicly accessible: ${response.status}`);
          }
        } catch (urlError) {
          console.warn(`⚠️ Could not verify image URL accessibility:`, urlError);
        }
        
        return downloadURL;
      } catch (error) {
        console.error(`❌ Error uploading image ${index + 1}:`, error);
        throw new Error(`Failed to upload image ${index + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });

    const imageUrls = await Promise.all(uploadPromises);
    console.log(`🎉 All ${imageUrls.length} images uploaded successfully!`);
    console.log('📋 Final image URLs:', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('💥 Error in uploadProductImages:', error);
    throw new Error(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Create a new product listing
export const createProduct = async (
  productData: ProductFormData, 
  userId: string, 
  userEmail: string
): Promise<string> => {
  try {
    console.log('🚀 Starting product creation...', {
      title: productData.title,
      category: productData.category,
      hasImages: productData.images && productData.images.length > 0,
      imageCount: productData.images?.length || 0
    });
    
    // Get user profile to include user's name
    const userProfile = await getUserProfile(userId);
    const userName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : userEmail;
    
    // First create the product document without images to get a proper ID
    const tempProduct = {
      title: productData.title,
      description: productData.description,
      size: productData.size,
      condition: productData.condition,
      category: productData.category,
      pointsValue: productData.pointsValue,
      imageUrls: [], // Will be updated after upload
      userId,
      userEmail,
      userName,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    console.log('📝 Creating document in Firestore...');
    const docRef = await addDoc(collection(db, 'products'), tempProduct);
    console.log('✅ Document created with ID:', docRef.id);
    
    // If there are images, upload them and update the document
    if (productData.images && productData.images.length > 0) {
      console.log(`📸 Processing ${productData.images.length} images...`);
      
      try {
        const imageUrls = await uploadProductImages(productData.images, docRef.id);
        
        if (imageUrls && imageUrls.length > 0) {
          console.log('🔄 Updating document with image URLs...');
          await updateDoc(doc(db, 'products', docRef.id), {
            imageUrls,
            updatedAt: Timestamp.now(),
          });
          console.log('✅ Document updated with images:', imageUrls);
        } else {
          console.warn('⚠️ No image URLs returned from upload');
        }
      } catch (imageError) {
        console.error('💥 Error uploading images:', imageError);
        // Don't fail the entire product creation if images fail
        console.log('⚠️ Product created but images failed to upload');
      }
    } else {
      console.log('📝 No images to upload');
    }
    
    console.log('🎉 Product creation completed successfully!');
    return docRef.id;
  } catch (error) {
    console.error('💥 Error creating product:', error);
    throw new Error(`Failed to create product listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching all products from Firestore...');
    
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    console.log(`Found ${querySnapshot.docs.length} documents`);
    
    const products = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        console.log('Document data:', doc.id, data);
        return {
          id: doc.id,
          ...data
        } as Product;
      })
      .filter(product => {
        // Only include products with essential fields
        const isValid = product.title && 
                       product.category && 
                       product.size && 
                       product.condition && 
                       product.description &&
                       product.pointsValue !== undefined;
        
        if (!isValid) {
          console.log('Filtering out incomplete product:', product.id, product);
        }
        
        return isValid;
      });
    
    console.log(`Returning ${products.length} valid products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Fetch products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product))
      .filter(product => product.title && product.category);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category');
  }
};

// Fetch products by user
export const getProductsByUser = async (userId: string): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product))
      .filter(product => product.title && product.category);
  } catch (error) {
    console.error('Error fetching user products:', error);
    throw new Error('Failed to fetch user products');
  }
};
