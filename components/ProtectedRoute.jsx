'use client'

import { selectUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const  user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;  

  return children;
};

export default ProtectedRoute;
