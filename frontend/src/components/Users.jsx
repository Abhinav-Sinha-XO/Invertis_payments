import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";



export const Users = ()=>{

  const [users,setUsers] = useState([]);
  const [filter,setFilter] = useState('');

  useEffect( ()=>{
    const fetchUser = async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/bulk`,{
      params: {
        filter:filter
      }
    });
    setUsers(response.data.user);
    }

    fetchUser();
  }, [filter])
  


  return(
    <div className=" pl-7 ">
      <div className="text-xl font-bold flex ">
        Users
      </div>
      <div className="my-2 pr-7">
        <input onChange={(e)=>{
          setFilter(e.target.value)
        }} type="text" placeholder="Search users..." className="border w-full h-9  rounded pl-2 "></input>
      </div>
      <div>
        {users.map(user=><User
        key={user._id} user={user}></User>)}

      </div>
    </div>
  )
}

function User({user}){
  const navigate = useNavigate();

  return(
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-2">
          <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
            {user.firstname[0]}
          </div>
        </div>
        <div>
          <div className="font-bold">
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center pr-5">
        <Button onClick={(e)=>{
          navigate("/send?id=" + user._id + "&name=" + user.firstname);
        }} label={"Send Money"} className="text-sm px-2 py-1"></Button>
      </div>
    </div>
  )
}