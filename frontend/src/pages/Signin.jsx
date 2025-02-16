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
      <div className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          
          <div className="bg-white rounded-xl shadow-2xl shadow-white p-6 sm:p-8">
            <div className="text-center space-y-4">
              <Heading label={"SignIn"}></Heading>
              <SubHeading label={"Enter your credentials to access your account"} className="text-sm sm:text-base text-gray-600"></SubHeading>
            </div>

            <div className="mt-8 space-y-6">
              <InputBox onChange={(e)=>{setUsername(e.target.value)}} label={"Email"} placeholder = {"emailname@gmail.com"} className="w-full"></InputBox>

              <InputBox onChange={(e)=>{setPassword(e.target.value)}} label={"Password"} placeholder={"password"} className="w-full"></InputBox>

              <div className="pt-2">
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
                  className="w-full"
                />
              </div>
              {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}
              <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} className="mt-4"/>
            </div>
          </div>
        </div>
      </div>
    )
}