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
  const ebayRes = await fetch(
    "https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item/12345678",
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(item),
    }
  );
  const stuff = await ebayRes.json();
  console.log("sell stuff", stuff);

  res.status(200).json({ message: "item added!" });
}
