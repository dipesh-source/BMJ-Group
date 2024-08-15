"use client";

import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { fetchPurchaseOrders } from "@/redux/slices/purchaseOrdersSlice";

export default function Header() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const items = useSelector((state: RootState) => state.items.items);
  const { purchaseOrdersRes, fetchOrderStatus, cartItems } = useSelector(
    (state: RootState) => state.purchaseOrders
  );
  const firstNames = items.map((item) => item.Name.split(",")[0]);

  const handleFocus = () => {
    setIsFocused(true);
    setDisplayedValue(inputValue || firstNames[currentWordIndex]);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (fetchOrderStatus === "idle" || fetchOrderStatus) {
      dispatch(fetchPurchaseOrders());
    }
  }, []);
  const totalItems = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  );
  const totalCost = cartItems.reduce(
    (acc: number, item: any) =>
      item?.quantity * item?.SalesDetails?.UnitPrice + acc,
    0
  );

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    const currentWord = firstNames[currentWordIndex];

    // Ensure currentWord is defined before proceeding
    if (!currentWord) {
      return;
    }

    if (!isFocused && inputValue === "") {
      if (!isDeleting && displayedValue.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedValue(currentWord.slice(0, displayedValue.length + 1));
        }, 150);
      } else if (!isDeleting && displayedValue.length === currentWord.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else if (isDeleting && displayedValue.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedValue(displayedValue.slice(0, -1));
        }, 100);
      } else if (isDeleting && displayedValue.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % firstNames.length);
      }
    } else {
      setDisplayedValue(inputValue);
    }

    return () => clearTimeout(timeout);
  }, [
    inputValue,
    displayedValue,
    isDeleting,
    currentWordIndex,
    isFocused,
    firstNames,
  ]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-col flex-wrap justify-end items-end mx-auto max-w-screen-xl p-4 pb-0">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="#"
              className="text-sm text-blue-900 dark:text-blue-500 hover:underline"
            >
              My Account
            </a>
            <a
              href="#"
              className="text-sm text-blue-900 dark:text-blue-500 hover:underline"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-sm text-blue-900 dark:text-blue-500 hover:underline"
            >
              Help
            </a>
            <a
              href="#"
              className="text-sm text-blue-900 dark:text-blue-500 hover:underline"
            >
              Logout
            </a>
          </div>
          <div className="py-3 text-sm">
            <span className="italic">Hello </span>{" "}
            <span className="text-blue-900">Subas Kumar</span>
            <p className="text-gray-400">BMJ Group Limited</p>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-5 max-w-screen-xl mx-auto pb-5 items-end">
          <div className="col-span-1">
            <div onClick={() => router.push("/")} className="cursor-pointer">
              <div className="h-12 w-28">
                <img
                  src="https://www.booker.co.uk/images/ShopLocallyLogo.jpg"
                  className="h-full w-full"
                />
              </div>
              <h5 className="text-blue-900 text-[22px]">Tottenham</h5>
            </div>
          </div>
          <div className="w-full col-span-5">
            <form className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={displayedValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder=""
                  className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 "
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-[12px] px-3 py-1.5"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-span-2">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => router.push("/cart")}
                type="button"
                className="text-black bg-[#fdead3] font-medium rounded text-xs px-2 py-1 text-nowrap"
              >
                Extended Range Collect
                <div className="flex mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2.5em"
                    height="2.5em"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="orange"
                      d="M230.14 58.87A8 8 0 0 0 224 56H62.68L56.6 22.57A8 8 0 0 0 48.73 16H24a8 8 0 0 0 0 16h18l25.56 140.29a24 24 0 0 0 5.33 11.27a28 28 0 1 0 44.4 8.44h45.42a27.75 27.75 0 0 0-2.71 12a28 28 0 1 0 28-28H91.17a8 8 0 0 1-7.87-6.57L80.13 152h116a24 24 0 0 0 23.61-19.71l12.16-66.86a8 8 0 0 0-1.76-6.56M104 204a12 12 0 1 1-12-12a12 12 0 0 1 12 12m96 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m4-74.57a8 8 0 0 1-7.9 6.57H77.22L65.59 72h148.82Z"
                    />
                  </svg>
                  <div className="ml-1">
                    <h5 className="text-red-700">
                      {/* ${purchaseOrdersRes?.totalCost} */}$
                      {totalCost.toFixed(2)}
                    </h5>
                    <span className="text-gray-500">
                      {/* {purchaseOrdersRes?.totalItems} Items  */}
                      {totalItems} Items
                    </span>
                  </div>
                </div>
              </button>
              <button
                onClick={() => router.push("/cart")}
                type="button"
                className="text-white bg-[#2356AA] font-medium rounded text-sm px-5 py-2.5"
              >
                Trolley
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav className="bg-[#2356AA] mt-2">
        <div className="max-w-screen-xl px-4 py-2 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row justify-between w-full font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm text-white">
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-2 border-b-2 border-transparent hover:border-gray-300 rounded-t-lg hover:text-black hover:bg-white"
                >
                  My Booker
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-2 border-b-2 border-gray-300 rounded-t-lg text-black bg-white"
                >
                  Products
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-2 border-b-2 border-transparent hover:border-gray-300 rounded-t-lg hover:text-black hover:bg-white"
                >
                  Promotions
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-2 border-b-2 border-transparent hover:border-gray-300 rounded-t-lg hover:text-black hover:bg-white"
                >
                  Services
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-2 border-b-2 border-transparent hover:border-gray-300 rounded-t-lg hover:text-black hover:bg-white"
                >
                  Ordering Tools
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
