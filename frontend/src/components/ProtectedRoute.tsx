import { ReactElement, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"


// type protectedProps ={
//     children:ReactElement
// }
function ProtectedRoute(){
   const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(null)

   useEffect(()=>{
   const token = localStorage.getItem('token')

   if(token){
    setIsAuthenticated(true)
   }else{
    setIsAuthenticated(false)
   }
   },[])

   if(isAuthenticated == null) {
    return <div>Loading...</div>
   }

   if(!isAuthenticated){
    return <Navigate to={'/signup'} />
   }

    return <>
    
     <Outlet/>
    
    </>
}

export default ProtectedRoute