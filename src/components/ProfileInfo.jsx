import React from 'react';

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img 
        src={user.profilePic} 
        alt={`${user.prenom} ${user.nom}`} 
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl text-white text-center mb-2">{`${user.prenom} ${user.nom}`}</h2>
      <p className="text-gray-400 text-center">{user.email}</p>
    </div>
  );
};

export default ProfileInfo;
