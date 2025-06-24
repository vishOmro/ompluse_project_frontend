"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
 



  useEffect(() => {
    const token = Cookies.get("token");

      const publicPaths = ["/auth/login", "/auth/register", "/auth/company_login"];
      const pathIsProtected = !publicPaths.includes(router.pathname);
    
      if (!token && pathIsProtected) {
      router.push("/auth/login");
    } 
  }, [router]);

  


  return <div>This is home page</div>;
};

export default Page;
