import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { getUsers } from "../../api/api";
import { isLoginState, usersState } from "../../atoms";
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
    margin: 70px 0 0;
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

    const { isLoading } = useQuery(["users"], getUsers, {
        onSuccess(data) {
            setUsers(data!);
        },
    });

    const navigator = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    return (
        <NetworkWrap>
            <NetworkHeadingSelectBox>
                <NetworkTitle>우리들의 포트폴리오를 만나보세요</NetworkTitle>
                <SelectBox>
                    <CheckBoxWrap>
                        <input type="checkbox" name="frontEnd" id="frontEnd" />
                        <Label htmlFor="frontEnd">프론트엔드</Label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="backEnd" id="backEnd" />
                        <Label htmlFor="backEnd">백엔드</Label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="dataAnalysis" id="dataAnalysis" />
                        <Label htmlFor="dataAnalysis">데이터분석</Label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="AI" id="AI" />
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
                    {users?.map((user) => (
                        <UserCard key={user.id} {...user} />
                    ))}
                </NetworkContainer>
            )}
        </NetworkWrap>
    );
}

export default Network;
