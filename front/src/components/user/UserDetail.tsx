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
import { useRecoilValue } from "recoil";

const PortfolioContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const { isLoading } = useQuery(["UserInfo"], () => getUser(id!), {
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
                    <PortfolioContainer>
                        {user && (
                            <>
                                <UserCard {...user} />
                                <Education info={[...user?.educations!]} />
                                <Award info={[...user?.awards!]} />
                                <Certificate info={[...user?.certificates!]} />
                                <Project info={[...user?.projects!]} />
                            </>
                        )}
                    </PortfolioContainer>
                </>
            )}
        </>
    );
}

export default UserDetail;
