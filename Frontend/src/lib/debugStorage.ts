import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './firebase';

// Debug utility for testing Firebase Storage
export const debugStorage = {
  // Test image upload
  async testUpload(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const testRef = ref(storage, `test/debug_${Date.now()}.jpg`);
      const snapshot = await uploadBytes(testRef, file);
      const url = await getDownloadURL(snapshot.ref);
      console.log('✅ Test upload successful:', url);
      return { success: true, url };
    } catch (error) {
      console.error('❌ Test upload failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Test public image upload
  async testPublicUpload(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      const testRef = ref(storage, `public/test/debug_${Date.now()}.jpg`);
      const snapshot = await uploadBytes(testRef, file);
      const url = await getDownloadURL(snapshot.ref);
      console.log('✅ Test public upload successful:', url);
      return { success: true, url };
    } catch (error) {
      console.error('❌ Test public upload failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Test URL accessibility
  async testUrlAccess(url: string): Promise<{ accessible: boolean; status?: number; error?: string }> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return { accessible: response.ok, status: response.status };
    } catch (error) {
      console.error('❌ URL test failed:', error);
      return { accessible: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // List all files in products directory
  async listProductImages(): Promise<string[]> {
    try {
      const productsRef = ref(storage, 'products/');
      const result = await listAll(productsRef);
      
      const urls: string[] = [];
      for (const itemRef of result.items) {
        try {
          const url = await getDownloadURL(itemRef);
          urls.push(url);
        } catch (error) {
          console.warn('Could not get URL for:', itemRef.fullPath, error);
        }
      }
      
      console.log('📁 Found product images:', urls);
      return urls;
    } catch (error) {
      console.error('❌ Error listing product images:', error);
      return [];
    }
  },

  // List all files in public/products directory
  async listPublicProductImages(): Promise<string[]> {
    try {
      const productsRef = ref(storage, 'public/products/');
      const result = await listAll(productsRef);
      
      const urls: string[] = [];
      for (const itemRef of result.items) {
        try {
          const url = await getDownloadURL(itemRef);
          urls.push(url);
        } catch (error) {
          console.warn('Could not get URL for:', itemRef.fullPath, error);
        }
      }
      
      console.log('📁 Found public product images:', urls);
      return urls;
    } catch (error) {
      console.error('❌ Error listing public product images:', error);
      return [];
    }
  },

  // Check storage configuration
  checkConfig() {
    console.log('🔧 Firebase Storage Config:');
    console.log('- Storage bucket:', storage.app.options.storageBucket);
    console.log('- App name:', storage.app.name);
    console.log('- Storage instance:', !!storage);
  }
};

// Function to run all debug tests
export const runStorageDebugTests = async () => {
  console.log('🧪 Running Firebase Storage debug tests...');
  
  debugStorage.checkConfig();
  
  // Try to list existing images
  await debugStorage.listProductImages();
  await debugStorage.listPublicProductImages();
};
