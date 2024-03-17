import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || ""
  );
  const [userName, setUserName] = useState(null);

  const getData = () => {
    const decoded = jwtDecode(userToken);
    setUserName(decoded.userName);
  };

  useEffect(() => {
    userToken ? localStorage.setItem("userToken", userToken) : localStorage.removeItem("userToken")

    if(userToken) {
      getData()
    }

    
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userName, setUserToken, setUserName, userToken }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
