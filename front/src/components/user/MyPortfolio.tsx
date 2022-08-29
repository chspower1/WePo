import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Education from "@education/Education";
import Award from "@award/Award";
import Certificate from "@certificate/Certificate";
import Project from "@project/Project";
import { getUser } from "@api/api";
import { curUserState, isLoginState, IUser } from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./UserCard";
import UserDetail from "./UserDetail";
import styled from "styled-components";
import * as Mypage from "@styledComponents/CategoryStyled";
function MyPortfolio() {
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const [curUser, setCurUser] = useRecoilState(curUserState);
    const { isLoading } = useQuery(["newCurUser"], () => getUser(curUser?.userId!), {
        onSuccess(data) {
            setCurUser((prev) => ({ ...prev, ...data! }));
            console.log(curUser);
            console.log(curUser?.awards);
        },
    });
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    if (!curUser) return <></>; //이거 없으면 마이페이지에서 로그아웃하면 흰화면이 뜸
    if (isLoading) return <></>;
    return (
        <>
            <Mypage.Root>
                <Mypage.MyPortWrap>
                    <Mypage.UserCardBox>{curUser && <UserCard {...curUser} />}</Mypage.UserCardBox>
                    <Mypage.Wrap>
                        <Education educationsProps={curUser?.educations!} />
                        <Award awardsProps={curUser?.awards!} />
                        <Certificate certificatesProps={curUser?.certificates!} />
                        <Project projectsProps={curUser?.projects!} />
                    </Mypage.Wrap>
                </Mypage.MyPortWrap>
            </Mypage.Root>
        </>
    );
}

export default MyPortfolio;
