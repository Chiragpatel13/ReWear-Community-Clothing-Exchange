import Navbar from "@/components/Navbar";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  points: 320,
};

const listedItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=400&fit=crop",
    title: "Vintage Denim Jacket",
    points: 120,
    status: "Available",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    title: "Summer Dress",
    points: 80,
    status: "Swapped",
  },
];

const swappedItems = [
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    title: "Leather Boots",
    points: 150,
    from: "@bob",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=400&fit=crop",
    title: "Graphic Tee",
    points: 40,
    from: "@carol",
  },
];

const pointsHistory = [
  { id: 1, type: "gain", amount: 120, description: "Listed Vintage Denim Jacket", date: "2024-07-01" },
  { id: 2, type: "redeem", amount: -80, description: "Swapped Summer Dress", date: "2024-07-03" },
  { id: 3, type: "gain", amount: 150, description: "Received Leather Boots", date: "2024-07-05" },
  { id: 4, type: "redeem", amount: -40, description: "Swapped Graphic Tee", date: "2024-07-07" },
];

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">{mockUser.name}</h1>
            <p className="text-gray-400 mb-2">{mockUser.email}</p>
            <span className="inline-block px-4 py-2 rounded bg-blue-700 text-white text-lg font-semibold">{mockUser.points} pts</span>
          </div>
        </div>

        {/* Items Listed */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Items Listed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listedItems.length === 0 ? (
              <div className="col-span-full text-gray-400">No items listed yet.</div>
            ) : (
              listedItems.map(item => (
                <Card key={item.id} className="bg-gray-800 border-gray-700">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardContent className="p-4">
                    <CardTitle className="text-white text-lg mb-1">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold">{item.points} pts</span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${item.status === "Available" ? "bg-green-700 text-white" : "bg-gray-600 text-gray-200"}`}>{item.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Items Swapped */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Items Swapped</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {swappedItems.length === 0 ? (
              <div className="col-span-full text-gray-400">No items swapped yet.</div>
            ) : (
              swappedItems.map(item => (
                <Card key={item.id} className="bg-gray-800 border-gray-700">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardContent className="p-4">
                    <CardTitle className="text-white text-lg mb-1">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 rounded bg-blue-700 text-white text-xs font-semibold">{item.points} pts</span>
                      <span className="inline-block px-2 py-1 rounded bg-gray-600 text-gray-200 text-xs font-semibold">from {item.from}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Points History */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Points History</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-gray-800 border border-gray-700 text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-300 font-semibold">Date</th>
                  <th className="px-4 py-2 text-gray-300 font-semibold">Description</th>
                  <th className="px-4 py-2 text-gray-300 font-semibold">Type</th>
                  <th className="px-4 py-2 text-gray-300 font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">No points history yet.</td>
                  </tr>
                ) : (
                  pointsHistory.map(entry => (
                    <tr key={entry.id}>
                      <td className="px-4 py-2 text-gray-200">{entry.date}</td>
                      <td className="px-4 py-2 text-gray-200">{entry.description}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${entry.type === "gain" ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>{entry.type === "gain" ? "Gain" : "Redeem"}</span>
                      </td>
                      <td className="px-4 py-2 text-gray-200 font-bold">{entry.amount > 0 ? "+" : ""}{entry.amount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 