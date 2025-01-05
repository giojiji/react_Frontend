// useAuthRedirect.ts
import { useEffect } from "react";
import { redirect } from 'next/navigation'

const useAuthRedirect = () => {
    useEffect(() => {
        const isLogin = localStorage?.getItem("accessToken")
        if(!isLogin) {
          redirect("/")
        }
      })
};

export default useAuthRedirect;
