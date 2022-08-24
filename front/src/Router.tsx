import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPortfolio from "./components/MyPortfolio";
import RegisterForm from "./components/user/RegisterForm";
import Network from "./components/user/Network";
import Header from "./components/Header";
import LoginForm from "./components/user/LoginForm";
import { useRecoilValue } from "recoil";
import { isLoginState } from "./atoms";
import { useEffect } from "react";
import UserDetail from "./components/user/UserDetail";
function Router() {
    const isLogin = useRecoilValue(isLoginState);
    useEffect(() => {
        if (isLogin) return;
    }, [isLogin]);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MyPortfolio />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/network/:id" element={<UserDetail />} />
                <Route path="/network" element={<Network />} />
                {/* <Route path="*" element={<Portfolio />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
