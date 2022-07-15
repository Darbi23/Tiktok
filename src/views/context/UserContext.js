import React, { useState } from 'react';

const UserContext = React.createContext(null);

export const UserProvider = ({ children}) => {
  const [data, setUserData] = useState([]);

  const submitData = (newData) => {
    setUserData(newData);
  };

  return (
    <UserContext.Provider value={{ data, submitData }}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;