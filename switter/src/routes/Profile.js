import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
export const auth = getAuth();
