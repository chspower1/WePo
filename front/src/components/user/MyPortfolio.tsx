import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Education from "@education/Education";
import Award from "@award/Award";
import Certificate from "@certificate/Certificate";
import Project from "@project/Project";
import { getUser } from "@api/api";
import { curUserState, isLoginState, IUser } from "@scr/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./UserCard";
import UserDetail from "./UserDetail";
import styled from "styled-components";

export const MvpContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(162, 190, 231, 0.25);
    padding: 50px 50px 80px;
    background: #fff;
    & + & {
        margin-top: 40px;
    }
    @media screen and (max-width: 960px) {
        margin-top: 40px;
    }
`;
export const MvpTitleBox = styled.div`
    width: 100%;
`;
export const MvpTitle = styled.h2`
    font-size: 25px;
    font-weight: 900;
`;
export const MvpContentContainer = styled.div`
    margin-top: 30px;
    width: 80%;
    height: auto;
`;
export const MvpContentBox = styled.div`
    width: 100%;
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #a9a9a9;
`;
export const MvpContentName = styled.h2`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 20px;
`;
export const MvpContentAccent = styled.h2`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 20px;
    color: #3867ff;
`;
export const MvpContentDetail = styled.h3`
    font-size: 15px;
    margin-bottom: 10px;
`;
export const MvpContentDate = styled.h3`
    font-size: 15px;
    color: #a9a9a9;
    margin-bottom: 20px;
`;
export const MvpEditButton = styled.button`
    width: 27px;
    height: 27px;
    outline: 0;
    position: absolute;
    right: 30px;
    top: 10px;
`;
export const MvpDeleteButton = styled.button`
    width: 27px;
    height: 27px;
    outline: 0;
    position: absolute;
    right: 0px;
    top: 10px;
`;
export const MvpAddButton = styled.button`
    width: 45px;
    height: 45px;
`;

export const MvpAddInput = styled.input.attrs((props) => ({
    type: props.type || "text",
}))`
    width: ${(props) => props.width}px;
    height: 30px;
    border-radius: 3px;
    border: 0;
    border: solid 1px #3687ff;
    margin-bottom: 10px;
`;

export const MvpAddInputBox = styled.div`
    position: relative;
    width: auto;
    height: auto;
    display: ${(props) => props.style?.display || "flex"};
    flex-direction: column;
`;
export const RequiredLabel = styled.span`
    color: #3687ff;
`;
export const Button = styled.button`
    background-color: ${(props) => props.color || "white"};
    color: ${(props) => (props.color ? "white" : "default")};
    border: ${(props) => !props.color && "1px solid #7A7A7A"};
    width: 80px;
    height: 40px;
    border-radius: 10px;
    margin-right: 10px;
`;
export const MajorGraduate = styled.input.attrs((props) => ({
    type: "radio",
    name: props.name,
    value: props.value,
}))``;

export const MajorGraduateLabel = styled.label`
    color: black;
    margin-right: 10px;
`;
export const Root = styled.div`
    background: #eff3ff;
`;
export const MyPortWrap = styled.div`
    position: relative;
    width: 100%;
    max-width: 1300px;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    margin-top: 100px;
    padding: 80px 30px;
    @media screen and (max-width: 960px) {
        flex-direction: column;
    }
`;
export const MvpWrap = styled.div`
    width: 100%;
    max-width: 800px;
    margin-left: 100px;
    @media screen and (max-width: 960px) {
        margin-left: 0;
        max-width: 100%;
    }
`;
export const UserCardBox = styled.div`
    max-width: 350px;
    @media screen and (max-width: 960px) {
        max-width: 100%;
    }
`;

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
            <Root>
                <MyPortWrap>
                    <UserCardBox>{curUser && <UserCard {...curUser} />}</UserCardBox>
                    <MvpWrap>
                        <Education educationsProps={curUser?.educations!} />
                        <Award awardsProps={curUser?.awards!} />
                        <Certificate certificatesProps={curUser?.certificates!} />
                        <Project projectsProps={curUser?.projects!} />
                    </MvpWrap>
                </MyPortWrap>
            </Root>
        </>
    );
}

export default MyPortfolio;
