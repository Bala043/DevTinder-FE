import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const DEFAULT_PROFILE_PHOTO = "https://randomuser.me/api/portraits/lego/1.jpg";

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    if (connections !== null) return;
    fetchConnections();
  }, [connections]);

  if (connections === null) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20">
        <img
          src="https://illustrations.popsy.co/gray/open-box.svg"
          alt="No Connections"
          className="w-28 h-28 opacity-70"
        />
        <h1 className="text-xl mt-4 text-gray-500">No Connections</h1>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4">
      {connections.map(({ fullName, age, profilePhoto, gender, about, _id }) => (
        <div
          key={_id}
          className="bg-primary text-white rounded-2xl shadow-lg border-4 border-primary-content/30 overflow-hidden mb-6 p-4 flex flex-col md:flex-row items-center gap-4 transition hover:scale-[1.01]"
        >
          <img
            src={profilePhoto || DEFAULT_PROFILE_PHOTO}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex-1 text-center md:text-left space-y-1">
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-sm">Age: {age || "Not Mentioned"}</p>
            <p className="text-sm">About: {about || "No description available"}</p>
            <p className="text-sm">Gender: {gender || "Not Mentioned"}</p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="btn btn-error btn-sm">Remove</button>
            { _id &&(
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-error btn-sm">Chat</button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
