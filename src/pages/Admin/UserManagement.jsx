import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/UserServices';
import LoadingSpinner from '../../components/LoadingSpinner';
import UserCard from '../../components/Admin/UserCard';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        if (Array.isArray(userData)) {
          const sortedUsers = userData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
  }, []);
    
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 p-4">{error}</p>;
  }

  return (
    <div className='flex-1 p-8'>
      <h1 className="text-4xl font-bold text-center my-8">User Management</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {users.map((user) => (
          <UserCard
            key={user._id}
            {...user}
          />
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
