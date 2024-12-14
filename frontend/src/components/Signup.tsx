import { useState } from "react"
import Input from "./Input"
import axios from "axios"
import { useNavigate } from "react-router-dom"



function Signup(){

   const [email,setEmail] = useState("")
   const [firstName,setfirstname] = useState("")
   const [lastName,setlastname] = useState("")
   const [password,setpassword] = useState("")

  const navigate = useNavigate()

  async function SignupUser(){

   const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
        email,
        firstName,
        lastName,
        password
    })
    console.log("response",response)
    if(response.status == 200){
        localStorage.setItem('token',response.data.token)
        navigate('/',{state:response.data.user})
        
    }
   }
    

    return<>
       <div className="w-full h-screen bg-slate-500 flex justify-center items-center">

        <div className="w-80 h-fit border border-red-600 rounded-lg flex flex-col items-center gap-2">
            <div className="text-xl font-bold mt-1">
                SignUp
            </div>
            
           <div className="w-full flex flex-col gap-2">
            <Input onChange={(e)=>setEmail(e.target.value)} lable="Email"/>
            <Input onChange={(e)=>setfirstname(e.target.value)} lable="FirstName"/>
            <Input onChange={(e)=>setlastname(e.target.value)} lable="LastName"/>
            <Input onChange={(e)=>setpassword(e.target.value)} lable="Password"/>
           </div>
           
           <div className="w-full px-3 my-2">
           <button onClick={SignupUser} type="button" className=" w-full py-2.5 px-5 me-2 mb-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">SignUp</button>
            
            </div>      
      
        </div>


       </div>
    </>
}

export default Signup