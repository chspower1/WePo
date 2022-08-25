import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Award from "../award/Award";
import Certificate from "../certificate/Certificate";
import Education from "../education/Education";
import Project from "../project/Project";
import UserCard from "./UserCard";
import { IUser } from "./../../atoms";
import { useQuery } from "react-query";
import { getUser } from "../../api/api";
import styled from "styled-components";

const PortfolioContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>();

    const { isLoading } = useQuery(["getUser"], () => getUser(id), {
        onSuccess(user) {
            setUser(user);
        },
    });
    return (
        <>
            {isLoading ? (
                "로딩중"
            ) : (
                <PortfolioContainer>
                    {user && <UserCard {...user} />}
                    <Education {...user?.educations!} />
                    <Award {...user?.awards!} />
                    <Certificate {...user?.certificates!} />
                    <Project {...user?.projects!} />{" "}
                </PortfolioContainer>
            )}
        </>
    );
}

export default UserDetail;
