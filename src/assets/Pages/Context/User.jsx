import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
 export const UserContext= createContext();
 const UserContextProvider =({children}) => {
  const [userToken,setUserToken]=useState(localStorage.getItem('userToken'));
  const[userName,setUserName]= useState(null);
 const getData=()=> {
    if(userToken!=null){
        const decoded = jwtDecode(userToken);
setUserName(decoded.userName);

    }
 }
useEffect( ()=>{
    getData();
},[userToken]);
return <UserContext.Provider value={{userName,setUserToken,setUserName}}>
{children}
</UserContext.Provider>
;
 }
 export default UserContextProvider ;