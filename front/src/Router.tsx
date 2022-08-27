import { BrowserRouter, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import MyPortfolio from "./components/user/MyPortfolio";
import RegisterForm from "./components/user/RegisterForm";
import Network from "./components/user/Network";
import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import { useRecoilValue } from "recoil";
import { isLoginState } from "./atoms";
import { useEffect } from "react";
import UserDetail from "./components/user/UserDetail";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import SEO from "./components/SEO";
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
                <Route path="/mypage" element={<MyPortfolio />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/network" element={<Network />} />
                <Route path="/network/:userSeq" element={<UserDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
