// import Image from "next/image";
// import ProductCategoryView from "@/sections/product/product-view"

// import { Metadata } from 'next'
 
// export const metadata: Metadata = {
//   title: 'Drinks',
// }

// export default function ProductPage() {
//   return <ProductCategoryView />
// }



import { Metadata } from 'next';
import ProductCategoryView from '@/sections/product/product-view';

export const metadata: Metadata = {
  title: 'Drinks',
};

// Define the possible category paths to pre-generate
export async function generateStaticParams() {
  const categories = ["wine", "beer", "whiskey"]; // Static example

  return categories.map((category) => ({
    category: category.toLowerCase(), // Ensure consistency
  }));
}

export default function ProductPage() {
  return <ProductCategoryView />;
}
