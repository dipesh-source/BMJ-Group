import Image from "next/image";
import UserCartView from "@/sections/cart/cart-view"

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Drinks',
}

export default function userCartPage() {
  return <UserCartView />
}
