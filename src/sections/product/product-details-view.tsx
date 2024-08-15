"use client";

import ProductCard from "@/componnets/product-card";
import { fetchContacts } from "@/redux/slices/ContactsSlice";
import { fetchItems } from "@/redux/slices/ItemsSlice";
import { getCookie } from "@/utils/cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { fetchItem } from "@/redux/slices/ItemSlice";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { addProductToCart } from "@/redux/slices/purchaseOrdersSlice";
import showToast from "@/utils/toastService";
import Image from 'next/image';

export default function ProductDetailsView({ productData }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Description, SalesDetails, Name, PurchaseDescription } =
    productData ?? {};
  const addToCart = async () => {
    try {
      dispatch(addProductToCart(productData));
      showToast("Product added to cart.", "success");
      router?.push("/cart");
    } catch (error) {
      alert("Error while adding to cart, Please try again later.");
    }
  };

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-5">
      <button
        onClick={() => router.back()}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="white"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
          />
          <path
            fill="white"
            d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
          />
        </svg>
      </button>
      <div>
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-6 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5 h-full w-full border rounded-lg py-5">
                <div className="h-full overflow-hidden p-10">
                  <Image
                    className="h-96 mx-auto max-w-full object-cover"
                    src={PurchaseDescription?.split(",")?.[0]}
                    alt={Name?.split(",")?.[0]}
                    width={500} // Adjust width based on your requirements
                    height={500} // Adjust height based on your requirements
                    layout="responsive" // Ensure responsive loading
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 lg:row-span-2 lg:row-end-2">
            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
              {Name?.split(",")?.[0]}
            </h1>

            <div className="mt-2.5 mb-5 flex items-center">
              <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                750ML
              </span>
            </div>

            <div className="mt-7 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0 text-black">
              <div className="flex items-end">
                <h1 className="text-2xl font-bold mt-1">
                  ${SalesDetails?.UnitPrice}
                </h1>
                <span className="ml-1 text-sm text-slate-900 line-through">
                  ${SalesDetails?.UnitPrice + 99}
                </span>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-blue-700 bg-none px-8 py-2.5 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <div className="mt-10">
              <p className="text-sm text-gray-500">{Description}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="border-b border-gray-300">
              <nav className="flex gap-4">
                <a
                  title=""
                  className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  Description
                </a>

                <a
                  title=""
                  className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                >
                  Product Disclaimer
                </a>
              </nav>
            </div>
            <div className="mt-2 flow-root">
              <p className="mt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                accusantium nesciunt fuga.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-10 mb-5">
        <h1 className="text-3xl font-bold">Similar Products</h1>
        <div className="grid grid-cols-12 gap-5 mt-7">
          {Products?.map((product: any, index: number) => (
            <div key={index} className="col-span-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
