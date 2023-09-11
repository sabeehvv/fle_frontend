import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setLocation } from "../../redux_toolkit/valueSlice";
import toast from "react-hot-toast";



function AuthRequire() {
  const userInfo = useSelector((state) => state.userInfo);
  const location = useLocation();
  const dispatch = useDispatch();

  

  if (!userInfo.id && !location.state?.fromAuthRequire) {

    console.log(location, "location");
    dispatch(setLocation(location));

    setTimeout(() => {
      toast.error("Login Required");
    }, 100);

    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthRequire;