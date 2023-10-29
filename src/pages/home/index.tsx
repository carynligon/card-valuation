const getAuthToken = async () => {
  console.log("get");
  const d = {
    grant_type: `client_credentials`,
    scope:
      "https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope https:%3A%2F%2api.ebay.com%2oauth%2api_scope%2sell.account",
  };
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("scope", "https://api.ebay.com/oauth/api_scope");
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

export const getStaticProps = async () => {
  const token = await getAuthToken();

  return { props: { token } };
};

// export const getServerSideProps = async () => {

const HomeComponent = ({ token }: { token: string }) => {
  const browse = async () => {
    const res = await fetch(
      "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=gopro&fieldgroups=ASPECT_REFINEMENTS",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const stuff = await res.json();
    console.log("stuff", stuff);
  };

  browse();

  return <></>;
};

export default HomeComponent;
