"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthorized(true); // allow page rendering
    }
  }, [router]);

  if (!isAuthorized) return null; // or a loader

  return <div>This is home page</div>;
};

export default Page;
