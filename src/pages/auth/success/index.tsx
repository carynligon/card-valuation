"use client";
import { useEffect, useState } from "react";

const getAuthToken = async (code: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", "Caryn_Ligon-CarynLig-cardva-aydfzye");
  params.append("code", code);
  try {
    const localRes = await fetch(
      `/api/authToken?code=${encodeURIComponent(code)}`
    );
    const localToken = await localRes.json();

    return localToken.message;
  } catch (e) {
    console.log("error", e);
  }
};

const AuthSuccessPage = () => {
  const [authToken, setAuthToken] = useState("");
  const getToken = async (code: string) => {
    const token = await getAuthToken(code);
    setAuthToken(token);
  };
  useEffect(() => {
    if (window && window.location) {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code") || "";
      console.log("got code", code);
      getToken(code);
    }
  }, []);

  const addItem = async () => {
    const localRes = await fetch(
      `/api/addItem?token=${encodeURIComponent(authToken)}}`
    );
    const localItem = await localRes.json();
    console.log("localItem", localItem);
  };

  return (
    <>
      <button onClick={addItem}>Add item</button>
    </>
  );
};

export default AuthSuccessPage;
