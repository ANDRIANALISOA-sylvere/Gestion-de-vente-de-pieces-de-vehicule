import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const getData = useCallback(async () => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/checkauth/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
