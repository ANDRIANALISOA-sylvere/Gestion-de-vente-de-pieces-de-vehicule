import { useEffect, useState } from "react";

export const RoleGuard = ({ children, requiredRole }) => {
  const [localUser, setLocalUser] = useState("");

  useEffect(() => {
    const utilisateur = localStorage.getItem("user");
    setLocalUser(JSON.parse(utilisateur));
  }, []);
  
  if (localUser.role === requiredRole) {
    return children;
  }

  return null;
};
