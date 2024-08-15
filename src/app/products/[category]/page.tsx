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
  // Fetch categories from an API, database, or define them manually
  const categories = ["wine", "beer", "whiskey"]; // Example categories

  return categories.map((category) => ({
    category, // This matches the dynamic [category] in the route
  }));
}

export default function ProductPage() {
  return <ProductCategoryView />;
}
