import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!validateEmail(emailId)) {
      setError("Invalid Email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/login", { email: emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      if (res.status === 200) {
        const user = res.data;
        navigate(!user.age || !user.gender ? "/profile" : "/");
      }
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  const handleSignUp = async () => {
    if (!fullName.trim() || !emailId.trim() || !password.trim()) {
      setError("Please fill all the fields");
      return;
    }
    if (!validateEmail(emailId)) {
      setError("Invalid Email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/signup", { fullName, email: emailId, password }, { withCredentials: true });
      if (res.status === 200) {
        setIsLogin(true);
        setEmailId("");
        setPassword("");
      }
      if (res.status === 400) {
        setError(res.statusText);
      }
    } catch (err) {
      if (err?.response?.status === 400) {
        setError("User Already Exists");
      }
    }
  };

  return (
    <div className="flex justify-center my-10 px-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4">
        <legend className="fieldset-legend text-center font-bold text-lg">{isLogin ? "Login" : "Sign Up"}</legend>

        {!isLogin && (
          <>
            <label className="label mt-6">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </>
        )}

        <label className="label mt-6">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          required
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label mt-6">{isLogin ? "Password" : "New Password"}</label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="my-4 text-center cursor-pointer underline" onClick={() => {
          setError("");
          setIsLogin(!isLogin);
        }}>
          {isLogin ? "New User? Sign Up" : "Already a User? Sign In"}
        </p>

        <p className="text-red-500 text-center">{error}</p>

        <button className="btn btn-neutral mt-4 w-full" onClick={() => isLogin ? handleLogin() : handleSignUp()}>
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
