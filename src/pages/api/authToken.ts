import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let token = "";
  const code = req.query.code || "";
  const getAuthToken = async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", "Caryn_Ligon-CarynLig-cardva-aydfzye");
    params.append("code", code as string);
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
      console.log("res222", res);
      const tokenResp = await res.json();
      console.log("kkkkk", tokenResp);
      token = tokenResp.access_token;
    } catch (e) {
      res.status(500).json({ message: JSON.stringify(e) });
      console.log("error", e);
    }
  };

  await getAuthToken();

  res.status(200).json({ message: token });
}
