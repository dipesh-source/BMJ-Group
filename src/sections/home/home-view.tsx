"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "@/redux/slices/ItemsSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { fetchContacts } from "@/redux/slices/ContactsSlice";
import AccessDeniedModal from "@/componnets/AccessDeniedModal/AccessDeniedModal";
import AgeVerificationModal from "@/componnets/AgeVerificationModal/AgeVerificationModal";
import GetContactDetailModel from "@/componnets/GetContactDetailModel/GetContactDetailModel";
import products from "@/utils/productData";

interface Category {
  id: number;
  title: string;
  img: string;
}

const HomeView: React.FC = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [initialCheck, setInitialCheck] = useState<boolean>(true);
  const [showContactDetail, setShowContactDetail] = useState<boolean>(false);

  const { contacts } = useSelector((state: RootState) => state.contacts);
  const contactsStatus = useSelector(
    (state: RootState) => state.contacts.status
  );
  const contactsError = useSelector((state: RootState) => state.contacts.error);
  //for without token
  // const { Items: items } = products;
  const { items } = useSelector((state: RootState) => state.items);

  const itemsStatus = useSelector((state: RootState) => state.items.status);
  const itemsError = useSelector((state: RootState) => state.items.error);

  useEffect(() => {
    const ageVerificationStatus = getCookie("ageVerified");
    if (ageVerificationStatus === "1") {
      dispatch(fetchContacts()).then(() => {
        const contactData = JSON.parse(
          localStorage.getItem("emailVerified") ?? "false"
        );
        if (contactData?.ContactID) {
          dispatch(fetchItems());
        } else if (!contactData) {
          setShowContactDetail(true);
        }
      });
    }
  }, [isAgeVerified]);

  useEffect(() => {
    const ageVerificationStatus = getCookie("ageVerified");
    if (ageVerificationStatus === "1") {
      setIsAgeVerified(true);
    } else if (ageVerificationStatus === "0") {
      setAccessDenied(true);
    }
    setInitialCheck(false);
  }, []);

  const handleConfirm = () => {
    setCookie("ageVerified", "1", { expires: 7 });
    setIsAgeVerified(true);
    setShowContactDetail(true);
  };

  const handleCancel = () => {
    setCookie("ageVerified", "0", { expires: 7 });
    setAccessDenied(true);
  };

  const handleContactDetailConfirm = (email: string) => {
    const contact = contacts.find((contact) => {
      return contact.EmailAddress === email;
    });
    if (contact) {
      // setEmailVerified(true);
      localStorage.setItem("emailVerified", JSON.stringify(contact));
      setShowContactDetail(false);
      dispatch(fetchItems());
    } else {
      console.log("Email verification failed.");
    }
  };

  if (initialCheck) {
    return null;
  }

  if (accessDenied) {
    return <AccessDeniedModal />;
  }

  return (
    <>
      {!isAgeVerified && (
        <AgeVerificationModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {showContactDetail && (
        <GetContactDetailModel
          email={email}
          setEmail={(e) => setEmail(e)}
          onConfirm={() => {
            handleContactDetailConfirm(email);
            // setShowContactDetail(false);
          }}
        />
      )}
      {isAgeVerified && (
        <div className="min-h-screen max-w-screen-xl mx-auto p-5">
          <div className="grid grid-cols-10 w-full">
            <div className="col-span-2">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                All Categories
              </h2>
              {/* {contacts.length > 0 && (
                <p>ContactID: {contacts[0].EmailAddress}</p>
              )} */}
              <ul className="text-gray-600 text-sm">
                {/* {categories.map((item) => (
                  <li key={item.id} className="mb-2">
                    <a href="#" className="hover:underline">
                      {item.title}
                    </a>
                  </li>
                ))} */}
                {items.map((item) => (
                  <li key={item.ItemID} className="mb-2">
                    <a href="#" className="hover:underline">
                      {item.Name.split(",")[1]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-8">
              <div className="border-l p-3">
                <div className="h-52">
                  <img
                    src="https://liquorworld.com.np/wp-content/uploads/2023/05/Liquor-World-Banner-Slider-1.jpg"
                    className="w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-12 gap-5 py-10">
                  {/* {categories.map((item) => (
                    <div key={item.id} className="col-span-3">
                      <div
                        onClick={() => router.push(`/products/${item.title}`)}
                        className="border p-2 hover:border-2 hover:border-blue-700 text-center rounded-lg cursor-pointer"
                      >
                        <div className="h-36 overflow-hidden">
                          <img className="rounded-lg" src={item.img} />
                        </div>
                        <p className="text-blue-700 mt-2">{item.title}</p>
                      </div>
                    </div>
                  ))} */}
                  {items.map((item) => (
                    <div key={item.ItemID} className="col-span-3">
                      <div
                        onClick={() =>
                          router.push(
                            `/products/${encodeURIComponent(item?.Name)}`
                          )
                        }
                        className="border p-2 hover:border-2 hover:border-blue-700 text-center rounded-lg cursor-pointer"
                      >
                        <div className="h-50 overflow-hidden">
                          <img
                            className="rounded-lg"
                            src={item?.PurchaseDescription?.split(",")?.[1]}
                          />
                        </div>
                        <p className="text-blue-700 mt-2">
                          {item.Name.split(",")[1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeView;
