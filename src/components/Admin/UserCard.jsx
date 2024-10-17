import React, { useState } from 'react';
import { unbanUser, banUser } from '../../services/UserServices';

const UserCard = ({
    _id,
    nom,
    prenom,
    email,
    type,
    numero_telephone,
    adresse,
    birthday,
    abonnement,
    created_at,
    archived_user: userStatus,
    profilePic,
}) => {
    const [isBanned, setIsBanned] = useState(userStatus);

    // console.log("profilePic", profilePic);
    const profilePicUrl = `${process.env.REACT_APP_MINIO_PATH}${profilePic}`;

    const handleBanToggle = async () => {
        try {
            let updatedUser;
            if (isBanned) {
                updatedUser = await unbanUser(_id);
            } else {
                updatedUser = await banUser(_id);
            }
            setIsBanned(!isBanned);
        } catch (error) {
            console.error('Error updating user ban status:', error);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-xs flex-shrink-0">
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <div className="relative">
                        <img
                            src={profilePicUrl}
                            alt={`${nom} ${prenom}`}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        {type === 'Administrateur' && (
                            <div className="absolute -top-1 -right-1">
                                <div className="w-5 h-5 bg-green-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs">👑</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">{nom} {prenom}</h3>
                <p className="text-gray-400">{email}</p>
                <p className="text-gray-400">{type}</p>
                <p className="text-gray-400">{numero_telephone}</p>
                <p className="text-gray-400">{adresse}</p>
                <p className="text-gray-400">{new Date(birthday).toLocaleDateString()}</p>
                <p className="text-gray-400">{abonnement}</p>
                <p className="text-gray-400">{new Date(created_at).toLocaleDateString()}</p>
                <p className="text-gray-500 italic">Is Banned: {isBanned ? 'Yes' : 'No'}</p>
                <div className="flex justify-center">

                <button
                    onClick={handleBanToggle}
                    className={`mt-2 px-4 py-2 rounded-xl ${isBanned ? 'bg-green-600 hover:bg-green-600' : 'bg-red-800 hover:bg-red-900'} text-white`}
                    >
                    {isBanned ? 'Unban' : 'Ban'}
                </button>
                    </div>
            </div>
        </div>
    );
};

export default UserCard;
