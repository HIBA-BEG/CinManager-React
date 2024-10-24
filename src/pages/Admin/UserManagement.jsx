import React, { useState, useEffect } from 'react';
import { deleteUser, getAllUsers } from '../../services/UserServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserCard from '../../components/Admin/UserCard';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const loggedInUserId = localStorage.getItem('userId'); // Assuming you store the logged-in user's ID in localStorage


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        if (Array.isArray(userData)) {
          const sortedUsers = userData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .filter(user => user._id !== loggedInUserId);

          setUsers(sortedUsers);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [loggedInUserId]);
    
  
  useEffect(() => {
    const filtered = users.filter(user =>
      (user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedRole === '' || user.type === selectedRole)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, selectedRole, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setFilteredUsers(filteredUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user.');
    }
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className='flex-1 p-8'>
      <h1 className="text-4xl font-bold text-center my-8">User Management</h1>
      <div className="flex justify-center mb-8 space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 w-64 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          <option value="Administrateur">Administrateurs</option>
          <option value="Client">Clients</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            {...user}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No users found matching your selection.</p>
      )}
    </div>
  );
};

export default UserManagement;
