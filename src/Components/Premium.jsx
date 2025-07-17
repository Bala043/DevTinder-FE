import  { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Premium = () => {
  const[premium,setPremium]=useState(false)
  useEffect(()=>{
    verifyPremiumUser()

  },[])
  const verifyPremiumUser=async()=>{
    

    const response=await axios.get(BASE_URL+"/premium/verify",{withCredentials:true})
    if(response.data.isPremium){
      setPremium(true);

    }

  }
    const handleBuyNow=async(plan)=>{
        const order=await axios.post(BASE_URL+"/payment/create",{memberShipType:plan},{withCredentials:true})
        const{key,amount,currency,orderId,notes}=order.data;
          const options = {
        key, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'WeChat Premium',
        description: 'Hello Friends Epdi Irukinga',
        order_id:orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.fullName,
          email: notes.emailId,
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremiumUser()
      };
        const rpz=new window.Razorpay(options)
        rpz.open()

    }
  return premium?("You Are Already A Premium User"): (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">Choose Your Premium Plan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* Free Plan */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-300 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">Current Plan (Free)</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>✔️ Access to Basic Features</li>
            <li>❌ No Blue Tick</li>
            <li>✔️ Match & Chat</li>
          </ul>
          <div className="text-center">
            <button className="px-5 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
              Current Plan
            </button>
          </div>
        </div>

        {/* Silver Plan */}
        <div className="bg-white shadow-md rounded-xl p-6 border-2 border-sky-400 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-center mb-4 text-sky-600">Silver Plan</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>✔️ All Free Features</li>
            <li>✔️ Blue Tick Badge</li>
            <li>✔️ Limited Priority Matching</li>
            <li>💰 ₹250 one-time</li>
          </ul>
          <div className="text-center">
            <button onClick={()=>handleBuyNow("silver")} className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition">
              Buy Now
            </button>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="bg-white shadow-md rounded-xl p-6 border-2 border-yellow-500 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-center mb-4 text-yellow-600">Gold Plan</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>✔️ All Free & Silver Features</li>
            <li>✔️ Premium Badge</li>
            <li>✔️ Full Priority Matching</li>
            <li>💰 ₹500 one-time</li>
          </ul>
          <div className="text-center">
            <button onClick={()=>{handleBuyNow("gold")}} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Premium;
