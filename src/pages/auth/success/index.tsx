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
    const item = {
      availability: {
        shipToLocationAvailability: {
          quantity: 50,
        },
      },
      condition: "NEW",
      product: {
        title: "GoPro Hero4 Helmet Cam",
        description: "New GoPro Hero4 Helmet Cam. Unopened box.",
        aspects: {
          Brand: ["GoPro"],
          Type: ["Helmet/Action"],
          "Storage Type": ["Removable"],
          "Recording Definition": ["High Definition"],
          "Media Format": ["Flash Drive (SSD)"],
          "Optical Zoom": ["10x"],
        },
        brand: "GoPro",
        mpn: "CHDHX-401",
        imageUrls: [
          "https://i*****g.com/0**********/**********1.jpg",
          "https://i*****g.com/0**********/**********2.jpg",
          "https://i*****g.com/0**********/**********3.jpg",
        ],
      },
    };
    const res = await fetch(
      "https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/12345678",
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(item),
      }
    );
    const stuff = await res.json();
    console.log("sell stuff", stuff);
  };

  return (
    <>
      <button onClick={addItem}>Add item</button>
    </>
  );
};

export default AuthSuccessPage;
