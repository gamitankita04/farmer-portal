import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersArray = [];
        
        querySnapshot.forEach((docSnap) => {
          const userData = docSnap.data();
          usersArray.push({
            id: docSnap.id,
            name: userData.uname || userData.name || 'No Name',
            email: userData.email || 'No Email',
            phone: userData.phone || 'Not provided',
            village: userData.village || userData.city || userData.address || 'Not provided',
            role: userData.role || 'user',
            status: userData.status || 'active',
            blocked: userData.blocked || false,
            createdAt: userData.createdAt || null
          });
        });
        
        setFarmers(usersArray);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error loading farmers data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBlock = async (id) => {
    try {
      const farmer = farmers.find(f => f.id === id);
      const newBlockedStatus = !farmer.blocked;
      
      // Update in Firestore
      const farmerDocRef = doc(db, "users", id);
      await updateDoc(farmerDocRef, {
        blocked: newBlockedStatus,
        status: newBlockedStatus ? 'blocked' : 'active'
      });

      // Update local state
      setFarmers(farmers.map(farmer =>
        farmer.id === id ? { 
          ...farmer, 
          blocked: newBlockedStatus,
          status: newBlockedStatus ? 'blocked' : 'active'
        } : farmer
      ));

      alert(`Farmer ${newBlockedStatus ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      console.error("Error updating farmer:", error);
      alert("Error updating farmer status");
    }
  };

  const deleteFarmer = async (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, "users", id));
        
        // Update local state
        setFarmers(farmers.filter(farmer => farmer.id !== id));
        alert('Farmer deleted successfully');
      } catch (error) {
        console.error("Error deleting farmer:", error);
        alert("Error deleting farmer");
      }
    }
  };

  const getStatusColor = (farmer) => {
    if (farmer.blocked) return 'bg-red-100 text-red-800';
    if (farmer.status === 'active') return 'bg-green-100 text-green-800';
    if (farmer.status === 'inactive') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (farmer) => {
    if (farmer.blocked) return 'Blocked';
    return farmer.status || 'Unknown';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Farmers Management</h1>
        <p className="text-gray-600">Manage all registered farmers ({farmers.length} total)</p>
      </div>

      {/* Search and Stats */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, email, phone, village, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Farmers List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{farmer.name}</div>
                  </td>
                  <td className="p-4 text-gray-600">{farmer.email}</td>
                  <td className="p-4 text-gray-600">{farmer.phone}</td>
                  <td className="p-4 text-gray-600">{farmer.village}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                      farmer.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {farmer.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(farmer)}`}>
                      {getStatusText(farmer)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleBlock(farmer.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          farmer.blocked 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                      >
                        {farmer.blocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => deleteFarmer(farmer.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        disabled={farmer.role === 'admin'} // Prevent deleting admin users
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFarmers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No farmers match your search' : 'No farmers found'}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-gray-800">{farmers.length}</div>
          <div className="text-gray-600">Total Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">
            {farmers.filter(f => f.status === 'active' && !f.blocked).length}
          </div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-red-600">
            {farmers.filter(f => f.blocked).length}
          </div>
          <div className="text-gray-600">Blocked</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">
            {farmers.filter(f => f.role === 'admin').length}
          </div>
          <div className="text-gray-600">Admins</div>
        </div>
      </div>
    </div>
  );
};

export default Farmers;