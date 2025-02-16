import { useState } from "react"
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl shadow-white p-6 sm:p-8">
          <div className="text-center space-y-4">
            <Heading label={"Sign Up"} />
            <SubHeading 
              label={"Enter your information to create an account"}
              className="text-sm sm:text-base text-gray-600"
            />
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <InputBox 
                onChange={(e) => {setUsername(e.target.value)}}
                label={"Email"}
                placeholder={"marco.1@gmail.com"}
                className="w-full"
              />

              <InputBox 
                onChange={(e) => {setPassword(e.target.value)}}
                label={"Password"}
                placeholder={"password"}
                type="password"
                className="w-full"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputBox 
                  onChange={(e) => {setFirstName(e.target.value)}}
                  label={"First Name"}
                  placeholder={"Marco"}
                  className="w-full"
                />
                
                <InputBox 
                  onChange={(e) => {setLastName(e.target.value)}}
                  label={"Last Name"}
                  placeholder={"Denis"}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
                      {
                        username,
                        password,
                        firstname,
                        lastname
                      }
                    );
                    localStorage.setItem("token", response.data.token);
                    setMessage("Sign up successful!");
                    navigate("/dashboard");
                  } catch (error) {
                    console.error("Error during signup:", error);
                    setMessage("Sign up failed. Please try again.");
                  }
                }}
                label={"Sign Up"}
                className="w-full"
              />
            </div>

            {message && (
              <p className="text-red-500 text-sm text-center mt-2">
                {message}
              </p>
            )}

            <BottomWarning 
              label={"Already have an account?"} 
              buttonText={"Sign in"} 
              to={"/signin"}
              className="mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}