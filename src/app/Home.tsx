// import { useEffect } from "react";

const consent_url = "https://auth.sandbox.ebay.com/oauth2/authorize";

const url = "https://api.sandbox.ebay.com/identity/v1/oauth2/token";
const secrets = {
  client_id: "CarynLig-cardvalu-SBX-2fcce2f20-8268e5c9",
  client_secret: "SBX-fcce2f20ae64-9636-430b-9790-ebb5",
  dev_id: "f86fda8f-5835-4cae-bc9f-1688a562a8c8",
};

// export const getServerSideProps = async () => {
//   const getAuthToken = async () => {
//     console.log("get");
//     await fetch(url, {
//       method: "POST",
//       headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         authorization: `Basic ${secrets.client_id}:${secrets.client_secret}`,
//       },
//       body: JSON.stringify({
//         grant_type: "client_credentials",
//         scope: "https://api.ebay.com/oauth/api_scope",
//       }),
//     });
//   };

//   getAuthToken();
// };

const HomeComponent = () => {
  // const getConsent = async()
  const getAuthToken = async () => {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `Basic ${secrets.client_id}:${secrets.client_secret}`,
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
      }),
    });
  };
  //   useEffect(() => {
  //     getAuthToken();
  //   }, []);

  return <></>;
};

export default HomeComponent;
