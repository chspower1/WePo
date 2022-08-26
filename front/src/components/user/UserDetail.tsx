import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Award from "../award/Award";
import Certificate from "../certificate/Certificate";
import Education from "../education/Education";
import Project from "../project/Project";
import UserCard from "./UserCard";
import { isLoginState, IUser } from "./../../atoms";
import { useQuery } from "react-query";
import { getUser } from "../../api/api";
import styled from "styled-components";
import { MyPortWrap, MvpWrap, UserCardBox } from "../MyPortfolio";
import { useRecoilValue } from "recoil";

function UserDetail() {
    const { userSeq } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const { isLoading } = useQuery(["UserInfo"], () => getUser(parseInt(userSeq!)!), {
        onSuccess(user) {
            setUser(user!);
        },
    });
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    return (
        <>
            {isLoading ? (
                "로딩중"
            ) : (
                <>
                    <MyPortWrap>
                        {user && (
                            <>
                                <UserCardBox>
                                    <UserCard {...user} />
                                </UserCardBox>
                                <MvpWrap>
                                    <Education info={[...user?.educations!]} />
                                    <Award info={[...user?.awards!]} />
                                    <Certificate info={[...user?.certificates!]} />
                                    <Project info={[...user?.projects!]} />
                                </MvpWrap>
                            </>
                        )}
                    </MyPortWrap>
                </>
            )}
        </>
    );
}

export default UserDetail;
