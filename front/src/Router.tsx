import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "@user/RegisterForm";
import Network from "@user/Network";
import Header from "@components/Header";
import LoginForm from "@user/LoginForm";
import { useRecoilValue } from "recoil";
import { isLoginState } from "@/atoms";
import { useEffect } from "react";

import NotFound from "@components/NotFound";
import Home from "@components/Home";
import SEO from "@components/SEO";
import ResultSearch from "./components/ResultSearch";
import UserDetails from "@user/UserDetails";
function Router() {
    const isLogin = useRecoilValue(isLoginState);
    useEffect(() => {}, [isLogin]);
    return (
        <BrowserRouter>
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
                <Route path="/search/:params" element={<ResultSearch />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
