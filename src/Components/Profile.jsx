import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const user = useSelector((store) => store.user);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [about, setAbout] = useState(user?.about || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');
  const dispatch = useDispatch();

  const handleEdit = async () => {
    if (!fullName.trim()) {
      setErrMessage('Full Name is required');
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrMessage('');
      }, 3000);
      return;
    }
    try {
      const res = await axios.patch(
       ` ${BASE_URL}/profile/edit`,
        { fullName, age, gender, about, profilePhoto },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrMessage(err?.response?.data || 'Something Went Wrong');
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <div className="toast toast-top toast-start z-50">
        {error && (
          <div className="alert alert-error">
            <span>{errMessage}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center px-4 pt-8 pb-24 md:flex-row md:justify-center md:gap-12">
        {user && (
          <div className="bg-base-200 border border-base-300 rounded-box w-full max-w-sm md:max-w-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

            <label className="label">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="label mt-4">Gender</label>
            <div className="flex flex-wrap gap-4">
              {['male', 'female', 'others'].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio radio-primary"
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>

            <label className="label mt-4">Age</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label mt-4">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Profile Photo"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />

            <label className="label mt-4">About</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>

            <button className="btn btn-neutral mt-6 w-full" onClick={handleEdit}>
              Save Profile
            </button>
          </div>
        )}

        {/* Live Preview Card */}
        {user && (
          <div className="mt-10 md:mt-0 md:ml-8 w-full max-w-sm">
            <UserCard
              user={{ fullName, age, gender, profilePhoto, about }}
              show={false}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;