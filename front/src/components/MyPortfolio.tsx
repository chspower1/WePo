import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import Project from "./project/Project";
import { getUser } from "../api/api";
import { curUserState, isLoginState, IUser } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./user/UserCard";
import UserDetail from "./user/UserDetail";

function MyPortfolio() {
    const { userId } = useParams();
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const [curUser, setCurUser] = useRecoilState(curUserState);
    // API
    // const { isLoading } = useQuery(["user"], () => getUser(userId!), {
    //     onSuccess(data) {
    //         setUser(data!);
    //     },
    // });
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    return (
        <>
            {curUser && (
                <>
                    <UserCard {...curUser}  />
                    <Education {...curUser?.educations!} />
                    <Award {...curUser?.awards!} />
                    <Certificate {...curUser?.certificate!} />
                    <Project {...curUser?.projects!} />
                </>
            )}
        </>
    );
}

export default MyPortfolio;
