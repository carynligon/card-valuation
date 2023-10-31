import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
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
  console.log("REQ", req.query);
  const authToken = decodeURIComponent(req.query.token as string);
  console.log("authToken", authToken);
  const params = new URLSearchParams();

  const setupStuff = async () => {
    const policy = {
      categoryTypes: [
        {
          name: "ALL_EXCLUDING_MOTORS_VEHICLES",
        },
      ],
      marketplaceId: "EBAY_US",
      name: "D********g",
      handlingTime: {
        unit: "DAY",
        value: "1",
      },
      shippingOptions: [
        {
          costType: "FLAT_RATE",
          optionType: "DOMESTIC",
          shippingServices: [
            {
              buyerResponsibleForShipping: "false",
              freeShipping: "true",
              shippingCarrierCode: "USPS",
              shippingServiceCode: "USPSPriorityFlatRateBox",
            },
          ],
        },
      ],
    };
    const policyRes = await fetch(
      "https://api.sandbox.ebay.com/sell/account/v1/fulfillment_policy",
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
          "Content-Language": "en-US",
          "accept-language": "en-US",
        },
        body: JSON.stringify(policy),
      }
    );
    const policyJson = await policyRes.json();
    console.log("policy", policyJson);
  };

  setupStuff();

  const checkPerms = async () => {
    const permsRes = await fetch(
      "https://api.sandbox.ebay.com/sell/account/v1/privilege/",
      {
        headers: {
          authorization: `Bearer ${authToken}`,
          "content-type": "application/json",
        },
      }
    );
    const perms = await permsRes.json();
    console.log("perms", perms);
  };

  checkPerms();

  const ebayRes = await fetch(
    "https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/12345678",
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${authToken}`,
        "content-type": "application/json",
        "Content-Language": "en-US",
        "accept-language": "en-US",
      },
      body: JSON.stringify(item),
    }
  );
  const stuff = await ebayRes.json();
  console.log("sell stuff", stuff);

  res.status(200).json({ message: "item added!" });
}
