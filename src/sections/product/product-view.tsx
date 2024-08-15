"use client";

import ProductCard from "@/componnets/product-card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import { AppDispatch, RootState } from "../../redux/Store";
import { fetchItems } from "@/redux/slices/ItemsSlice";
import { fetchContacts } from "@/redux/slices/ContactsSlice";
import products from "@/utils/productData";

// const Products = [
//   {
//     id: 1,
//     title: "ROCK PAPER RUM TROPICAL COCONUT",
//     price: "$249",
//     size: "180ML",
//     img: "https://admin.livingliquidz.com/ImagesUpload/ROCKPAPERRUMTROPICALCOCONUT20241032163.jpg",
//   },
//   {
//     id: 2,
//     inSale: true,
//     title: "AMRUT TWO INDIES WHITE RUM",
//     price: "$549",
//     size: "750ML",
//     img: "https://admin.livingliquidz.com/img/MD/AMRUT-TWO-INDIES-WHITE-RUM-2953.jpg",
//   },
//   {
//     id: 3,
//     inSale: true,
//     title: "BACARDI CARTA BLANCA",
//     price: "$529",
//     size: "700ML",
//     img: "https://admin.livingliquidz.com/img/MD/BACARDI-CARTA-BLANCA-845.jpg",
//   },
//   {
//     id: 4,
//     title: "BACARDI LIMON CITRUS",
//     price: "$749",
//     size: "750ML",
//     img: "https://admin.livingliquidz.com/img/MD/BACARDI-LIMON-CITRUS-846.jpg",
//   },
//   {
//     id: 5,
//     inSale: true,
//     title: "MAKA ZAI WHITE RUM",
//     price: "$249",
//     size: "750ML",
//     img: "https://admin.livingliquidz.com/img/MD/MAKA-ZAI-WHITE-RUM-1504.jpg",
//   },
//   {
//     id: 6,
//     title: "ROCK PAPER RUM ROAST COFFEE",
//     price: "$149",
//     size: "650ML",
//     img: "https://admin.livingliquidz.com/ImagesUpload/ROCKPAPERRUMROASTCOFFEE20240651257.jpg",
//   },
//   {
//     id: 7,
//     title: "CAMIKARA RUM 3 YO",
//     price: "$249",
//     size: "180ML",
//     img: "https://admin.livingliquidz.com/img/MD/CAMIKARA-RUM-3-YO-3081.jpg",
//   },
//   {
//     id: 8,
//     title: "Tequila",
//     price: "$249",
//     size: "180ML",
//     img: "https://admin.livingliquidz.com/img/MD/OLD-MONK-GOLD-RESERVE-DARK-RUM-473.jpg",
//   },
//   {
//     id: 9,
//     title: "OLD MONK GOLD RESERVE DARK RUM",
//     price: "$249",
//     size: "180ML",
//     img: "https://upload.wikimedia.org/wikipedia/commons/9/92/DecaturGins.jpg",
//   },
//   {
//     id: 10,
//     inSale: true,
//     title: "OLD MONK THE LEGEND DARK RUM",
//     price: "$249",
//     size: "180ML",
//     img: "https://admin.livingliquidz.com/img/MD/OLD-MONK-THE-LEGEND-DARK-RUM-475.jpg",
//   },
//   {
//     id: 11,
//     title: "PITBULL DARK RUM",
//     price: "$249",
//     size: "180ML",
//     img: "https://admin.livingliquidz.com/img/MD/PITBULL-DARK-RUM-2405.jpg",
//   },
//   // {
//   //     id: 12,
//   //     inSale: true,
//   //     title: "ROCK PAPER RUM INDIAN SPICED",
//   //     price: '$249',
//   //     size: '180ML',
//   //     img: "https://admin.livingliquidz.com/img/MD/ROCK-PAPER-RUM-INDIAN-SPICED-2265.jpg"
//   // },
//   // {
//   //     id: 13,
//   //     title: "BACARDI GOLD RUM",
//   //     price: '$249',
//   //     size: '180ML',
//   //     img: "https://admin.livingliquidz.com/img/MD/BACARDI-GOLD-RUM-847.jpg"
//   // },
//   // {
//   //     id: 14,
//   //     title: "MAKA ZAI GOLD RUM",
//   //     price: '$249',
//   //     size: '180ML',
//   //     img: "https://admin.livingliquidz.com/img/MD/MAKA-ZAI-GOLD-RUM-1503.jpg"
//   // },
//   // {
//   //     id: 15,
//   //     title: "OLD MONK LEMON RUM",
//   //     price: '$249',
//   //     size: '180ML',
//   //     img: "https://admin.livingliquidz.com/img/MD/OLD-MONK-LEMON-RUM-1358.jpg"
//   // },
// ];

export default function ProductCategoryView() {
  const dispatch: AppDispatch = useDispatch();

  //for without token
  // const { Items: items } = products;
  const { items } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    const ageVerificationStatus = getCookie("ageVerified");
    if (ageVerificationStatus === "1") {
      dispatch(fetchContacts()).then(() => {
        const contactData = JSON.parse(
          localStorage.getItem("emailVerified") ?? "false"
        );
        if (contactData?.ContactID) {
          dispatch(fetchItems());
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto p-5">
      <div className="grid grid-cols-10 w-full">
        <div className="col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Filter by
          </h2>
          <div className="mb-2">
            <h5 className="text-gray-700 text-sm">Brand</h5>
            <div className="py-2">
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  Kingfisher
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  Old Monk
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  Black Dog
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  Bacardi
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  Jack Daniels
                </label>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-gray-700 text-sm">Size</h5>
            <div className="py-2">
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  90ML
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  180ML
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  375ML
                </label>
              </div>
              <div className="flex items-center mb-2.5">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  700ML
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ms-3 text-sm font-medium text-blue-600"
                >
                  750ML
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="p-3">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white mx-1">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white mx-1">
                1000
              </span>
              results
            </span>
            <div className="grid grid-cols-12 gap-5 mt-10">
              {/* {Products?.map((product: any, index: number) => (
                <div key={index} className="col-span-4">
                  <ProductCard
                    id={product?.id}
                    title={product?.title}
                    image={product?.img}
                    price={product?.price}
                    size={product?.size}
                    inSale={product?.inSale}
                  />
                </div>
              ))} */}
              {items?.map((item: any, index: number) => (
                <div key={index} className="col-span-4">
                  <ProductCard
                    product={item}
                    // id={item?.ItemID}
                    // title={item?.Name.split(",")[0]}
                    // image={item?.img}
                    // price={item?.SalesDetails?.UnitPrice}
                    // size={item?.SalesDetails?.AccountCode + " ML"}
                    // inSale={item?.IsSold}
                    // description={item?.Description}
                  />
                </div>
              ))}
            </div>
            <nav className="flex justify-end py-10">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
