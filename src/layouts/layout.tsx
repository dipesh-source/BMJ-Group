"use client";

import { useEffect, useState } from "react";
// import { usePathname } from 'src/routes/hook';
import Footer from "./footer";
import Header from "./header";
import { ACCESS_TOKEN_KEY } from "@/utils/consts";
import { useRouter, usePathname } from "next/navigation";
import { getXeroLoginULR } from "@/utils/javascript";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const [isToken, setIsToken] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login") {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        const xeroLoginURL = getXeroLoginULR();
        router.push(xeroLoginURL);
      } else {
        setIsToken(true);
      }
    }
  }, [pathname]);
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div>{isToken || pathname === "/login" ? children : null}</div>
      <Footer />
    </div>
  );
}
