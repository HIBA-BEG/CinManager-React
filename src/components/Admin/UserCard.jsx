import React, { useState } from 'react';
import { unbanUser, banUser } from '../../services/UserServices';
import { MdDeleteOutline } from 'react-icons/md';

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
    onDelete
}) => {
    const [isBanned, setIsBanned] = useState(userStatus);

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
        <div className="relative bg-gray-800 rounded-lg p-8 w-full max-w-xs flex-shrink-0">
             {type === 'Administrateur' && (
                <button
                    onClick={() => onDelete(_id)}
                    className="absolute top-4 right-3 text-red-700 hover:text-red-500"
                >
                    <MdDeleteOutline size={30} />
                </button>
            )}
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

            <div className="space-y-2 text-gray-400 font-semibold">
                <h3 className="text-lg">Last Name: <span className="text-white font-normal">{nom}</span></h3>
                <h3 className="text-lg">First Name: <span className="text-white font-normal">{prenom}</span></h3>
                <p>Email: <span className="text-white font-normal">{email}</span></p>
                <p>Type: <span className="text-white font-normal">{type}</span></p>
                <p>Phone Number: <span className="text-white font-normal">{numero_telephone}</span></p>
                <p>Address: <span className="text-white font-normal">{adresse}</span></p>
                <p>Birthday: <span className="text-white font-normal">{new Date(birthday).toLocaleDateString()}</span></p>
                <p>Subscription: <span className="text-white font-normal">{abonnement}</span></p>
                <p>Created At: <span className="text-white font-normal">{new Date(created_at).toLocaleDateString()}</span></p>
                <p>Is Banned: <span className="text-white font-normal">{isBanned ? 'Yes' : 'No'}</span></p>
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
