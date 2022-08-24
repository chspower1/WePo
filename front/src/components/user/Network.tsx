import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getUsers } from "../../api/api";
import { isLoginState, IUser, usersState } from "../../atoms";
import UserCard from "./UserCard";


const NetworkWrap = styled.div`
    width:1300px;
    height:81%;
    margin: 0 auto;
    padding: 0 50px;
`
const NetworkContainer = styled.div`
    width: 100%;
    height:89%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    grid-row-gap: 80px ;
    grid-column-gap: 50px;
    overflow-y: scroll;
    padding:20px 7px 0 0;
    &::-webkit-scrollbar{
        width:5px;
    }
    &::-webkit-scrollbar-thumb{
        background: #5573df;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track{
        padding:5px 0;
    }
    
`

const NetworkHeadingSelectBox = styled.div`
width: 100%;
margin: 70px 0 0;

`

const NetworkTitle = styled.h1`
text-align: center;
font-size: 24px;
padding: 0 0 50px;
`

const SelectBox = styled.div`
    display:flex;
    justify-content:center;
    gap:10px;
`

const CheckBoxWrap = styled.div`
    display:flex;
    align-items:center;
`

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
                {/* 추가사항 <SelectBox>
                    <CheckBoxWrap>
                        <input type="checkbox" name="frontEnd" id="frontEnd" />
                        <label htmlFor="frontEnd">프론트엔드</label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="backEnd" id="backEnd" />
                        <label htmlFor="backEnd">백엔드</label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="dataAnalysis" id="dataAnalysis" />
                        <label htmlFor="dataAnalysis">데이터분석</label>
                    </CheckBoxWrap>
                    <CheckBoxWrap>
                        <input type="checkbox" name="AI" id="AI" />
                        <label htmlFor="AI">AI</label>
                    </CheckBoxWrap>
                </SelectBox> */}
            </NetworkHeadingSelectBox>
            <NetworkContainer>
                {isLoading ? "loding" : users?.map((user) => (
                    <UserCard key={user.id} {...user} />
                ))}
            </NetworkContainer>
        </NetworkWrap>
    );
}

export default Network;
