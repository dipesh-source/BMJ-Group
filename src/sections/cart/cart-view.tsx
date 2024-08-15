"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { postInvoice } from "@/redux/slices/InvoiceSlice";
import {
  emptyCart,
  fetchPurchaseOrders,
} from "@/redux/slices/purchaseOrdersSlice";
import { changeProductQuantity } from "@/redux/slices/purchaseOrdersSlice";

import axiosInstance from "@/utils/axiosInstance";
import showToast from "@/utils/toastService";

export default function UserCartView() {
  interface CartItem {
    id: string;
    title: string;
    img: string;
    category: string;
    ml: number;
    UnitAmount: number;
    Quantity: number;
    inStock: number;
    LineItemID: string;
    AccountCode: string;
    Description: string;
    DiscountRate: number;
  }

  const dispatch: AppDispatch = useDispatch();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { purchaseOrdersRes, fetchOrderStatus, error, cartItems } = useSelector(
    (state: RootState) => state.purchaseOrders
  );
  const handleClosePopup = () => {
    dispatch(emptyCart({}));
    setShowPopup(false);
  };
  const { PurchaseOrders } = purchaseOrdersRes ?? {};
  const purchaseOrderOne = PurchaseOrders?.find(
    (item: any) => item?.LineItems?.length === 3
  );

  // useEffect(() => {
  //   if (fetchOrderStatus !== "loading") dispatch(fetchPurchaseOrders());
  // }, []);

  // useEffect(() => {
  //   if (PurchaseOrders?.length > 0) {
  //     const mappedCart = PurchaseOrders?.flatMap((order) =>
  //       order.LineItems.map(
  //         ({ DiscountRate, Quantity, UnitAmount, ...rest }) => ({
  //           id: order.PurchaseOrderID,
  //           title: rest?.Description.split(",")[1] || "No Title",
  //           img: "https://example.com/default-image.jpg", // Placeholder image
  //           category: rest?.Description.split(",")[0] || "No Category",
  //           ml: 0, // No ml information in provided data
  //           UnitAmount,
  //           Quantity,
  //           inStock: 100, // Default value or should be fetched from another source
  //           DiscountRate: DiscountRate ? DiscountRate : 0,
  //           ...rest,
  //         })
  //       )
  //     );
  //     setCart((prev) => [...mappedCart]);
  //   }
  // }, [PurchaseOrders]);

  const handleCheckout = async () => {
    try {
      const contact = JSON.parse(
        localStorage.getItem("emailVerified") ?? "false"
      );
      const LineItems = cartItems?.map(
        ({ SalesDetails, Code, Description, quantity, ...rest }: any) => ({
          UnitAmount: SalesDetails?.UnitPrice,
          ItemCode: Code,
          Description,
          Quantity: quantity,
        })
      );
      const formattedDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-0+/g, "-");
      const purchaseOrderRes = await axiosInstance({
        method: "POST",
        url: "/PurchaseOrders",
        // data: purchaseOrderOne,
        data: {
          Contact: {
            ContactID: contact?.ContactID,
          },
          Date: formattedDate,
          LineItems,
        },
      });
      if (purchaseOrderRes?.status === 200) {
        const LineItemsForInvoice = cartItems?.map(
          ({
            Description,
            quantity,
            SalesDetails,
            DiscountRate = 0,
            Code,
          }: any) => ({
            Description,
            Quantity: quantity,
            UnitAmount: SalesDetails?.UnitPrice,
            DiscountRate,
            AccountCode: SalesDetails?.AccountCode,
            ItemCode: Code,
          })
        );
        const response = await axiosInstance({
          url: "/Invoices",
          // data: {
          //   ...purchaseOrderOne,
          //   Contact: {
          //     ContactID: contact?.ContactID,
          //   },
          //   Status: "SUBMITTED",
          //   Type: "ACCREC",
          //   DueDate: "/Date(1518685950940+0000)/",
          // },
          data: {
            Contact: {
              ContactID: contact?.ContactID,
            },
            Date: formattedDate,
            DueDate: "/Date(1518685950940+0000)/",
            LineItems: LineItemsForInvoice,
            Type: "ACCREC",
            Status: "SUBMITTED",
            LineAmountTypes: "Exclusive",
          },
          method: "POST",
        });

        showToast("Your order is placed successfully.", "success");
        setShowPopup(true);
      }
    } catch (error: any) {
      showToast(
        "There was an error while checking out, Please try again later.",
        "error"
      );
      console.error(
        "Error posting invoice:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // const handleQuantityChange = (lineItemID: string, delta: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.LineItemID === lineItemID
  //         ? {
  //             ...item,
  //             Quantity: Math.min(
  //               Math.max(1, item.Quantity + delta),
  //               item.inStock
  //             ),
  //           }
  //         : item
  //     )
  //   );
  // };
  const handleQuantityChange = (productId: string, quantity: number) => {
    dispatch(changeProductQuantity({ productId, quantity }));
  };

  // const totalItems = cart.reduce((acc, item) => acc + item.Quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (acc, item) => item?.quantity * item?.SalesDetails?.UnitPrice + acc,
    0
  );

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-5">
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {totalItems} Items
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* {cart.map((item, index) => (
                <CartItem
                  item={item}
                  key={item?.id}
                  handleQuantityChange={handleQuantityChange}
                />
              ))} */}
              {cartItems?.map((item) => (
                <CartItem
                  item={item}
                  key={item?.id}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="font-normal text-lg leading-8 text-black">
                    {totalItems} Items
                  </p>
                  <p className="font-medium text-lg leading-8 text-black">
                    {/* ${purchaseOrdersRes?.totalCost.toFixed(2)} */}$
                    {totalCost.toFixed(2)}
                  </p>
                </div>

                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                  Shipping
                </label>
                <div className="flex pb-6">
                  <div className="relative w-full">
                    <div className=" absolute left-0 top-0 py-3 px-4">
                      <span className="font-normal text-base text-gray-300">
                        Second Delivery
                      </span>
                    </div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="$5.00"
                    />
                    <button
                      id="dropdown-button"
                      data-target="dropdown-delivery"
                      className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                      type="button"
                    >
                      <svg
                        className="ml-2 my-auto"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="dropdown-delivery"
                      aria-labelledby="dropdown-delivery"
                      className="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Shopping
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Images
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            News
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Finance
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Promo Code
                </label>
                <div className="flex pb-4 w-full">
                  <div className="relative w-full ">
                    <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                      placeholder="xxxx xxxx xxxx"
                    />
                    <button
                      id="dropdown-button"
                      data-target="dropdown"
                      className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                      type="button"
                    >
                      <svg
                        className="ml-2 my-auto"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Shopping
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Images
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            News
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Finance
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200">
                  <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {totalItems} Items
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    {/* ${purchaseOrdersRes?.totalCost.toFixed(2)} */}$
                    {(totalCost + 5).toFixed(2)}
                  </p>
                </div>
                <button
                  className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                  disabled={
                    fetchOrderStatus === "loading" ||
                    fetchOrderStatus === "idle"
                  }
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
          {showPopup === true ? (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-black">
              <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Checkout</h2>
                <p>
                  {/* Your total is ${purchaseOrdersRes?.totalCost?.toFixed(2)}. */}
                  Your total is ${(totalCost + 5).toFixed(2)}.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
                  onClick={() => handleClosePopup()}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

const CartItem = ({ item, handleQuantityChange }: any) => {
  const UnitAmount = item?.UnitAmount || item?.SalesDetails?.UnitPrice;
  return (
    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
      <div className="w-full h-28 md:max-w-[126px] overflow-hidden">
        <img
          src={item.PurchaseDescription.split(",")[0]}
          className="mx-auto h-full"
          alt={item.title}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7 text-black">
              {item?.title || item?.Name}
            </h6>
            <h6 className="font-normal text-base leading-7 text-gray-500">
              {item.category}
            </h6>
            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              ${UnitAmount?.toFixed(2)}
            </h6>
          </div>
        </div>
        {/* <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3"> */}
        <div className="flex items-center h-full z-20">
          <button
            onClick={() => {
              handleQuantityChange(item.ItemID, item?.quantity - 1);
            }}
            disabled={item?.quantity === 1}
            className="group rounded-l-xl h-10 px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
          >
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="border-y h-10 border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
          />
          <button
            onClick={() =>
              handleQuantityChange(item.ItemID, item?.quantity + 1)
            }
            className="group rounded-r-xl px-5 h-10 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
          >
            <svg
              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M11 5.5V16.5M16.5 11H5.5"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
            ${(UnitAmount * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
