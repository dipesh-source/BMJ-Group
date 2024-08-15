"use client";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/consts";
import { getBase64XeroClients } from "@/utils/javascript";
import showToast from "@/utils/toastService";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const LoginComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const getAccessToken = async () => {
    const Authorization = getBase64XeroClients();
    const res = await axios({
      method: "POST",
      url: "https://identity.xero.com/connect/token",
      headers: {
        Authorization,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://bmjgrouplimited.com/",
      },
    });
    if (res?.status === 200) {
      localStorage.setItem(ACCESS_TOKEN_KEY, res?.data?.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, res?.data?.refresh_token);
      showToast("Login successfully, Please enjoy your experience.", "success");
      router.push("/");
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [searchParams]);

  return <div>Login...</div>;
};

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
};

export default Login;
