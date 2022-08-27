import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { getUsers } from "../../api/api";
import { isLoginState, usersState, checkedBoxValue, hopeJob } from "../../atoms";
import UserCard from "./UserCard";
import { ArrowRepeat } from "@styled-icons/bootstrap/ArrowRepeat";

const LoadingMotion = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const BgWrap = styled.div`
    width:100%;
    min-height:calc(100vh - 100px);
    background: #eff3ff;
    padding:100px 0 0;
`

const Root = styled.div`
width: 100%;
padding: 70px 0 0;
`

const NetworkWrap = styled.div`
    width: 100%;
    max-width: 1300px;
    min-width: 480px;
    height: 81%;
    margin: 0 auto;
    padding: 0 50px;

`;
const NetworkContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-row-gap: 80px;
    grid-column-gap: 50px;
    padding: 20px 0 90px;
`;

const NetworkHeadingSelectBox = styled.div`
    width: 100%;
`;

const NetworkTitle = styled.h1`
    text-align: center;
    font-size: 24px;
    padding: 0 0 30px;
`;

const SelectBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 0 30px;
`;

const CheckBoxWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    user-select: none;
`;

const LoadingBox = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    user-select: none;
`;
const LoadingIcon = styled(ArrowRepeat)`
    width: 26px;
    height: 26px;
    margin-right: 10px;
    animation: ${LoadingMotion} 2s infinite;
`;

function Network() {
    const location = useLocation();
    const pathName = location.pathname;
    const [users, setUsers] = useRecoilState(usersState);
    const isLogin = useRecoilValue(isLoginState);
    const [selectCheckBoxValues, setSelectCheckBoxValues] = useRecoilState(checkedBoxValue);
    const filterUsersState = useRecoilValue(hopeJob);

    const { isLoading } = useQuery(["users"], getUsers, {
        onSuccess(data) {
            setUsers(data!);
            console.log(users);
        },
    });

    const navigator = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);

    function handleCheckedBox(name: string) {
        setSelectCheckBoxValues((current) => {
            const currentChecked = [...current];
            const overlap = currentChecked.findIndex((el) => el === name);
            overlap === -1 ? currentChecked.push(name) : currentChecked.splice(overlap, 1);
            return currentChecked;
        });
    }

    return (
        <>
            {isLoading ? (
                <>로딩중</>
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
                                            value="frontEnd"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="frontEnd">프론트엔드</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="backEnd"
                                            value="backEnd"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="backEnd">백엔드</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="dataAnalysis"
                                            value="dataAnalysis"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="dataAnalysis">데이터분석</Label>
                                    </CheckBoxWrap>
                                    <CheckBoxWrap>
                                        <input
                                            type="checkbox"
                                            name="category"
                                            id="AI"
                                            value="AI"
                                            onClick={(e) => handleCheckedBox(e.currentTarget.value)}
                                        />
                                        <Label htmlFor="AI">AI</Label>
                                    </CheckBoxWrap>
                                </SelectBox>
                            </NetworkHeadingSelectBox>
                            {isLoading ? (
                                <LoadingBox>
                                    <LoadingIcon />
                                    Loading...
                                </LoadingBox>
                            ) : (
                                <NetworkContainer>
                                    {filterUsersState.map((user) => (
                                        <UserCard key={user._id} {...user} />
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
