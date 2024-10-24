import React, { useState, useEffect } from 'react';
import { getMyProfile, updateMyProfile, deleteMyAccount } from '../services/UserServices';
import { FaTimes } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthServices';

const ProfilePanel = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileData = await getMyProfile();
      console.log(profileData);
      setProfile(profileData);
      setUpdatedProfile(profileData);
    } catch (error) {
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleDateChange = (date) => {
    setUpdatedProfile(prevData => ({
      ...prevData,
      birthday: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMyProfile(updatedProfile);
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteMyAccount();
        localStorage.removeItem('token');
        // await logout()
        onClose();
        navigate('/');
      } catch (error) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 md:w-1/2 w-full shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-200 ease-in-out z-50`}>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat filter blur-md"
        style={{
          backgroundImage: `url(/images/bgProfile.jpg)`,
          zIndex: -1
        }}
      ></div>
      <div className="fixed inset-0 bg-white opacity-60" style={{ zIndex: -1 }}></div>

      <button onClick={onClose} className="absolute top-4 left-4">
        <FaTimes className="text-gray-500 hover:text-gray-700" />
      </button>
      <div className="px-8 py-4 m-12 bg-black bg-opacity-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        {error ? (
          <p className="text-red-500 text-center font-bold">{error}</p>
        ) : !profile ? (
          <LoadingSpinner />
        ) : (
          <>
            {editMode ? (
              <>
                <img src={`${process.env.REACT_APP_MINIO_PATH}${profile.profilePic}`} alt={profile.nom} className="w-1/3 h-1/3 rounded-lg mx-auto" />
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nom" className="block mb-1">Last Name</label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={updatedProfile.nom || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-red-800 font-semibold  focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block mb-1">First Name</label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={updatedProfile.prenom || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-red-800 font-semibold  focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={updatedProfile.email || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                  </div> */}
                  <div>
                    <label htmlFor="adresse" className="block mb-1">Adresse</label>
                    <input
                      type="adresse"
                      id="adresse"
                      name="adresse"
                      value={updatedProfile.adresse || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="numero_telephone" className="block mb-1">Phone Number</label>
                    <input
                      type="numero_telephone"
                      id="adresse"
                      name="numero_telephone"
                      value={updatedProfile.numero_telephone || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="birthday" className="block mb-1">Birthday</label>
                    <DatePicker
                      selected={updatedProfile.birthday}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      className='w-full p-2 border rounded-lg text-red-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-700'
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditMode(false)} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <img src={`${process.env.REACT_APP_MINIO_PATH}${profile.profilePic}`} alt={profile.nom} className="w-1/3 h-1/3 rounded-lg mx-auto" />
                  <p><strong>Full Name:</strong> {profile.nom} {profile.prenom}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.numero_telephone}</p>
                  <p><strong>Address:</strong> {profile.adresse}</p>
                  <p><strong>Subscription Type:</strong> {profile.abonnement}</p>
                  <p><strong>Birthday:</strong> {profile.birthday}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div className='mt-8'>
                    <button onClick={() => setEditMode(true)} className="btn btn-secondary ">
                      Edit Profile
                    </button>
                  </div>
                  <div className="mt-8">
                    <button onClick={handleDeleteAccount} className="btn btn-primary">
                      Delete Account
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;
