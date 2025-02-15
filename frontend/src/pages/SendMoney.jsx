import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";




export const SendMoney = ()=>{

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount,setAmount] = useState(0);
  const navigate = useNavigate()
  const [message,setMessage] = useState("")
  const [error, setError] = useState("")
 
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); 

      
      return () => clearTimeout(timer);
    }
  }, [message]);


  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/accounts/transfer`,
        {
          to: id,
          amount: parseInt(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );

      
      setMessage("Transfer successful!"); 
      setAmount(0);
      
    } catch (error) {
      console.error("Transfer failed:", error.response?.data || error);
      setError(error.response?.data?.message || "Transfer failed");
      
      if (error.response?.status === 403) {
        
        navigate("/signin");
      }
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center   ">
      <div className="h-120 w-130 bg-white rounded-xl shadow-2xl shadow-white ">
      <h2 className="flex justify-center font-bold text-4xl pt-20 pb-15">Send Money</h2>
      {error && <div className="text-red-500">{error}</div>}

      {message && (
          <div className={`text-center p-2 ${
            message.includes('successful') ? 'text-green-500' : 'text-red-500'
          }`}>
            {message}
          </div>
        )}



      <div className="flex pl-10 ">
        <span className="h-10 w-10 rounded-full bg-green-500 flex justify-center items-center text-white">{name[0].toUpperCase()}</span>
        <h3 className="text-xl p-1 pl-3 ">{name.toUpperCase()}</h3>
      </div>
      <div className="p-10">
        <label htmlFor="amount" className="pl-1 text-xl flex pb-2">Amount (in $)</label>
        <input className="flex border border-gray-300 rounded-md pl-2 w-full h-10 "
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          id="amount"
          placeholder="Enter amount"
        
        ></input>
        <div className="pt-6">
          <button onClick={handleTransfer} className=" w-full bg-green-500 rounded-md h-11 pt-"> Initiate Transfer</button>
        </div>
      </div>
    </div>
    </div>
  
  );
}
