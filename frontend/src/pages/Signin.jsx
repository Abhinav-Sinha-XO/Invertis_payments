import { useState } from "react"

import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"




export const Signin = () => {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message,setMessage] = useState("")
  const navigate = useNavigate()
  
   
    return (
      <div className="bg-black h-screen flex justify-center  ">
        <div className="flex flex-col justify-center ">
          
          <div className="rounded-lg bg-white  text-center p-2 h-auto px-4 w-md shadow-2xl shadow-white ">
            <Heading label={"SignIn"}></Heading>
            <SubHeading label={"Enter your credentials to access your account"}></SubHeading>

            <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"} placeholder = {"marco.1@gmail.com"}></InputBox>

            <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"password"}></InputBox>

            <div className="pt-4">
              <Button
              onClick={async () => {
                try {
                  const requestBody = {
                      username,
                      password,
                      };
                      
                  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`,requestBody);
                   
                  if (!response.data.token) {
                  
                  setMessage("No token received from server");
                  return;
                  }

                  localStorage.setItem("token", response.data.token);
                  

                  setMessage("Sign in successful!");
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Error during signin:", error);
                  setMessage("Sign in failed. Please try again.");
                }
              }}
              label={"Sign In"}
            />
          </div>
          {message && <p className="text-red-500">{message}</p>}
           <BottomWarning label={"Already have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>

    )
  
}