export const getServerSideProps = async () => {
  const EbayAuthToken = require("ebay-oauth-nodejs-client");

  const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.EBAY_CLIENT_ID,
    clientSecret: process.env.EBAY_CLIENT_SECRET,
    redirectUri: "Caryn_Ligon-CarynLig-cardva-aydfzye",
  });

  const authUrl = ebayAuthToken.generateUserAuthorizationUrl(
    "PRODUCTION",
    "https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope https:%3A%2F%2api.ebay.com%2oauth%2api_scope%2sell.account https:%3A%2F%2api.ebay.com%2oauth%2api_scope%2sell.inventory"
  );
  return { props: { authUrl } };
};

const AuthComponent = ({ authUrl }: { authUrl: string }) => {
  console.log("got authUrl?", authUrl);
  const split = authUrl.split("auth.ebay.com");
  const sandboxUrl = `${split[0]}auth.sandbox.ebay.com${split[1]}`;

  return (
    <>
      <a href={sandboxUrl}>Authorize ebay</a>
    </>
  );
};

export default AuthComponent;
