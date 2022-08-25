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
import styled from 'styled-components'  

export const MvpContainer = styled.div`
    width:50%;
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius:10px;
    box-shadow:0px 4px 25px #CDCDCD;
    margin-bottom:20px;
`
export const MvpTitleBox = styled.div`
    margin:40px 0 30px 60px;
    width:100%;
`
export const MvpTitle = styled.h2`
    font-size:25px;
    font-weight:900;
`
export const MvpContentContainer = styled.div`
    margin-top:30px;
    width:80%;
    height:auto;
`
export const MvpContentBox = styled.div`
    width:100%;
    position:relative;
    height:auto;
    display:flex;
    flex-direction:column;
    border-bottom:1px solid #A9A9A9;
`
export const MvpContentName = styled.h2`
    font-size:15px;
    font-weight:bold;
    margin-bottom:10px;
    margin-top:20px;
`
export const MvpContentDetail = styled.h3`
    font-size:15px;
    margin-bottom:10px;
`
export const MvpContentDate = styled.h3`
    font-size:15px;
    color:#A9A9A9;
    margin-bottom:20px;
`
export const MvpEditButton = styled.button`
    width:27px;
    height:27px;
    outline:0;
    position:absolute;
    right:30px;
    top:10px;
`
export const MvpDeleteButton = styled.button`
    width:27px;
    height:27px;
    outline:0;
    position:absolute;
    right:0px;
    top:10px;
`
export const MvpAddButton = styled.button`
    width:45px;
    height:45px;
`

export const MvpAddInput = styled.input.attrs(props=>({
    type:props.type || "text"
}))`
    width:${props => props.width}px;
    height:30px;
    border-radius:3px;
    border:0;
    border:solid 1px #3687FF;
    margin-bottom:10px;
`
export const MvpAddInputBox = styled.div`
    position:relative;
    width:auto;
    height:auto;
    display:${props => props.style?.display || "flex"};
    flex-direction:column;
`
export const RequiredLabel = styled.span`
    color:#3687FF;
`
export const Button = styled.button`
    background-color:${props => props.color || "white"};
    color:${props => props.color ? "white" : "default"};
    border:${props=> !props.color && "1px solid #7A7A7A"};
    width:80px;
    height:40px;
    border-radius:10px;
    margin-right:10px;
`

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
