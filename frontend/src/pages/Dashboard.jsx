import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { useState, useEffect } from "react";
import { Users } from "../components/Users";

export const Dashboard = ()=>{

  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  useEffect(()=>{
    const fetchBalance = async() => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/signin');
          return;
        }


        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/accounts/balance`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBalance(response.data.balance);
      } catch (error) {
        
        setError('Failed to fetch balance');
        if (error.response?.status === 401) { 
          navigate('/signin'); 
        }
      }
    };
    fetchBalance();
  }, [navigate]); 

  return(
    <div className="bg-white">
      <Appbar/>
      <div className="text-xl font-bold underline flex  justify-end pr-10 cursor-pointer">
        <button onClick={handleLogout} className="">Logout!</button>
      </div>
      <Balance balance={balance} error={error} />
      <div className="pt-5">
        <Users></Users>
      </div>
    </div>

  )
}