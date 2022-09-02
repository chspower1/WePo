import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "@user/RegisterForm";
import Network from "@user/Network";
import Header from "@components/Header";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@/atoms";
import { useEffect } from "react";

import NotFound from "@components/NotFound";
import Home from "@components/Home";
import SEO from "@components/SEO";
import UserDetails from "@user/UserDetails";
import ThemeChangeBtn from "@components/ThemeChangeBtn";
import SuccessRegister from "@components/SuccessRegister";
import ScrollToTop from "./ScrollToTop";
import LoginForm from "@user/LoginForm";
function Router() {
  const isLogin = useRecoilValue(isLoginState);
  useEffect(() => { }, [isLogin]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEO />
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<UserDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/network" element={<Network />} />
        <Route path="/network/:userSeq" element={<UserDetails />} />
        <Route path="/user/register/:userId/:authCode" element={<SuccessRegister />} />
      </Routes>
      <ThemeChangeBtn />
    </BrowserRouter>
  );
}
export default Router;
