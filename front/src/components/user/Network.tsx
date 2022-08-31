import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { getUser, getUsers } from "@api/api";
import {
    isLoginState,
    usersState,
    checkedBoxValue,
    hopeJob,
    IUser,
    searchUsersState,
} from "@/atoms";
import UserCard from "./UserCard";
import { ArrowRepeat } from "@styled-icons/bootstrap/ArrowRepeat";
import SearchBar from "@components/SearchBar";

const LoadingMotion = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const BgWrap = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${(props) => props.theme.bgColor};
    padding: 100px 0 0;
`;

const Root = styled.div`
    width: 100%;
    padding: 80px 0 0;
`;

const NetworkWrap = styled.div`
    width: 100%;
    max-width: 1300px;
    min-width: 480px;
    margin: 0 auto;
    padding: 0 30px;
`;
export const NetworkContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-row-gap: 80px;
    grid-column-gap: 50px;
    padding: 20px 0 90px;
`;

const NetworkHeadingSelectBox = styled.div`
    width: 100%;
    color: ${(props) => props.theme.textColor};
    margin: 0 0 70px;
`;

const NetworkTitle = styled.h1`
    text-align: center;
    font-size: 34px;
    padding: 0 0 80px;
`;

const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 0 20px;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    user-select: none;
`;

export const LoadingBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
    background-color: ${(props) => props.theme.bgColor};
`;
export const LoadingIcon = styled(ArrowRepeat)`
    width: 26px;
    height: 26px;
    margin-right: 10px;
    animation: ${LoadingMotion} 2s infinite;
`;

function Network() {
    const location = useLocation();
    const pathName = location.pathname;
    const [users, setUsers] = useRecoilState(usersState);
    const [netUsers, setNetUsers] = useState<IUser[]>([]);
    const isLogin = useRecoilValue(isLoginState);
    const [selectCheckBoxValues, setSelectCheckBoxValues] = useRecoilState(checkedBoxValue);
    const searchUsers = useRecoilValue(searchUsersState);
    const filterUsersState = useRecoilValue(hopeJob);

    const { isLoading,refetch } = useQuery(["users"], getUsers, {
        onSuccess(data) {
            setUsers(data!);
            setNetUsers(data!);
        },
    });

    const navigator = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);

    // Field 선택시
    useEffect(() => {
        setNetUsers(filterUsersState!);
    }, [filterUsersState]);
    useEffect(() => {
        setNetUsers(searchUsers!);
    }, [searchUsers]);
    function handleCheckedBox(name: string) {
        setSelectCheckBoxValues((current) => {
            const currentChecked = [...current];
            const overlap = currentChecked.findIndex((el) => el === name);
            overlap === -1 ? currentChecked.push(name) : currentChecked.splice(overlap, 1);

            return currentChecked;
        });
    }
    useEffect(()=>{
        refetch()
    },[netUsers])
    if (!users)
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        ); // undefined 방지
    if (isLoading)
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        ); // undefined 방지
    return (
        <>
            {isLoading ? (
                <LoadingBox>
                    <LoadingIcon />
                    Loading...
                </LoadingBox>
            ) : (
                <BgWrap>
                    <Root>
                        <NetworkWrap>
                            <NetworkHeadingSelectBox>
                                <NetworkTitle>우리들의 포트폴리오를 만나보세요</NetworkTitle>
                                <SelectBox>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="frontEnd"
                                            value="프론트엔드"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="frontEnd">프론트엔드</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="backEnd"
                                            value="백엔드"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="backEnd">백엔드</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="dataAnalysis"
                                            value="데이터분석"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="dataAnalysis">데이터분석</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="AI"
                                            value="인공지능"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="AI">AI</Label>
                                    </CheckBoxWrap>
                                </SelectBox>
                                <SearchBar />
                            </NetworkHeadingSelectBox>
                            {isLoading ? (
                                <LoadingBox>
                                    <LoadingIcon />
                                    Loading...
                                </LoadingBox>
                            ) : (
                                <NetworkContainer>
                                    {netUsers?.map((user) => (
                                        <UserCard key={user.userId} user={user} refetch={refetch}/>
                                    ))}
                                </NetworkContainer>
                            )}
                        </NetworkWrap>
                    </Root>
                </BgWrap>
            )}
        </>
    );
}

export default Network;
