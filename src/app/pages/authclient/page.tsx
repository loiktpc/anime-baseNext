// import React from "react";
"use client";

import { useAppSelector } from "../../store/store";

const AuthViewer = () => {
  const authState = useAppSelector((state) => state.auth.authState);
  const count = useAppSelector((state) => state.auth.count);
  return (
    <div className="flex gap border border-1 border-black p-20">
      You are now {authState ? "Logged  In" : "Logged Out"}

      <h3>count : {count} </h3>
    </div>

  );
};
export default AuthViewer;