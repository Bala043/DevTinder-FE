import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [visibleRequests, setVisibleRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL +'/user/request/received', {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
    setVisibleRequests(res.data.data);
  };

  const handleRequest = async (status, _id) => {
    await axios.post(
      `${BASE_URL}/request/review/${status}/${_id}`,
      {},
      { withCredentials: true }
    );
    setVisibleRequests((prev) => prev.filter((r) => r.fromUserId._id !== _id));
  };

  useEffect(() => {
    if (requests === null) fetchRequests();
    else setVisibleRequests(requests);
  }, [requests]);

  if (requests === null) return null;

 {
  requests.length === 0 && (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <img
        src="https://illustrations.popsy.co/gray/open-box.svg"
        alt="No Requests"
        className="w-28 h-28 opacity-70"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/no-data.svg"; // fallback to local image
        }}
      />
      <h2 className="text-xl mt-4 text-gray-500">No Requests Received</h2>
    </div>
  );
}


  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Connection Requests</h1>

      <AnimatePresence>
        {visibleRequests.map((request) => {
          const { fullName, profilePhoto, age, gender, about, _id } = request.fromUserId;

          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              layout
              className="bg-base-100 border border-base-300 shadow-md p-4 my-3 rounded-xl flex flex-col md:flex-row items-center gap-4 transition hover:shadow-xl"
            >
              {/* Profile Photo */}
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-1">
                <h2 className="text-xl font-semibold">{fullName}</h2>
                <p className="text-sm">Age: {age || 'Not Mentioned'}</p>
                <p className="text-sm">Gender: {gender || 'Not Mentioned'}</p>
                <p className="text-sm">About: {about || 'No description available'}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleRequest('accepted', _id)}
                  className="btn btn-success btn-sm transition duration-300 hover:scale-105"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest('rejected', _id)}
                  className="btn btn-error btn-sm transition duration-300 hover:scale-105"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Requests;
