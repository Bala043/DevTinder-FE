import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(false);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      } else if (err?.code === "ERR_NETWORK") {
        setIsOffline(true);
      }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl text-center">
          {isOffline ? "Server or Connection Problem" : "No Users Found"}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-6">
      <UserCard user={feed[0]} show={true} />
    </div>
  );
};

export default Feed;
