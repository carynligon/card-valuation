"use client";
import { useEffect } from "react";

const getAuthToken = async (code: string) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", "Caryn_Ligon-CarynLig-cardva-aydfzye");
  params.append("code", code);
  try {
    const res = await fetch(
      "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: `Basic ${btoa(
            process.env.EBAY_CLIENT_ID + ":" + process.env.EBAY_CLIENT_SECRET
          )}`,
          response_type: "token",
        },
        body: params,
      }
    );
    console.log("res", res);
    const token = await res.json();
    console.log("token", token);
    return token.access_token;
  } catch (e) {
    console.log("error", e);
  }
};

const AuthSuccessPage = () => {
  useEffect(() => {
    if (window && window.location) {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code") || "";
      console.log("got code", code);
      getAuthToken(code);
    }
  }, []);

  return <>Success!</>;
};

export default AuthSuccessPage;
