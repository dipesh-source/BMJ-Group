"use client";
import ProductDetailsView from "@/sections/product/product-details-view";

import { Metadata } from "next";
import axiosInstance from "@/utils/axiosInstance";
import products from "@/utils/productData";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Drinks",
// };

interface ProductData {
  id: string;
  Items: any;
  // Add other fields as necessary
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productData, setProductData] = useState<any>({});
  // console.log("🚀 ~ ProductPage ~ productData:", productData);
  async function fetchProductDetails(id: string) {
    try {
      const response = await axiosInstance<ProductData>({
        method: "GET",
        url: `/item/${id}`,
      });
      console.log("🚀 ~ fetchProductDetails ~ response:", response);
      setProductData(response?.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  }
  useEffect(() => {
    fetchProductDetails(params?.id);
  }, []);

  //for without token
  // const data = products?.Items?.find((item) => item?.ItemID === params?.id);

  return (
    <ProductDetailsView
      productData={productData?.Items?.[0]}
      // productData={data}
    />
  );
}
