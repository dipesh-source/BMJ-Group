"use client";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/slices/purchaseOrdersSlice";
import showToast from "@/utils/toastService";

// import { addToCart } from "@/redux/cartSlice"; // Import your Redux action

export default function ProductCard({ product }: any) {
  const {
    inSale = true,
    Name,
    ItemID,
    img,
    SalesDetails,
    PurchaseDescription,
  } = product;
  const router = useRouter();
  const dispatch = useDispatch();

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(addProductToCart(product));
    showToast("Product added to cart.", "success");
    router?.push("/cart");
  };

  return (
    <div
      onClick={() => router.push(`/products/details/${ItemID}`)}
      className="relative w-full h-full max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm border py-5"
    >
      <div className="h-52 p-3 flex justify-center items-center">
        <img
          className="h-full rounded-t-lg object-cover"
          src={PurchaseDescription?.split(",")?.[0]}
          alt="product image"
        />
      </div>
      {inSale && (
        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-orange-300 text-center text-sm text-white">
          Sale
        </span>
      )}
      <div className="mt-4 px-5 flex flex-col">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">
            {Name}
          </h5>
        </a>
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            {SalesDetails?.AccountCode + "ML"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              {SalesDetails?.UnitPrice}
            </span>
            <span className="ml-1 text-sm text-slate-900 line-through">
              $299
            </span>
          </p>
          <div>
            <button
              onClick={addToCart}
              className="flex items-center rounded-md bg-blue-700 px-3 py-2 text-center text-[13px] font-medium text-white hover:bg-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
