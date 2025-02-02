import { useEffect, useState } from "react";
import store from "../utils/reducer";


  const useAuth = () => {
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        const isLogin = Boolean(localStorage.getItem("accessToken"));
        if (isLogin) {
          store.dispatch({ type: "LOGIN_SUCCESS" });
          setLoginState(store.getState());
        }
    
        const unsubscribe = store.subscribe(() => setLoginState(store.getState()));
        return () => unsubscribe();
      }, []);

      return loginState
  };
  
  export default useAuth;