import Image from "next/image";
import ProductCategoryView from "@/sections/product/product-view"

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Drinks',
}

export default function ProductPage() {
  return <ProductCategoryView />
}
