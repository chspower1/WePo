import { useState } from "react";
import { useParams } from "react-router-dom";
import Award from "../award/Award";
import Certificate from "../certificate/Certificate";
import Education from "../education/Education";
import Project from "../project/Project";
import UserCard from "./UserCard";
import { IUser } from "./../../atoms";
import { useQuery } from "react-query";
import { getUser } from "../../api/api";

function UserDetail() {
    const userId = useParams();
    const [user, setUser] = useState<IUser>();
    // API
    // const { inLoading } = useQuery(["getUser"], () => getUser(userId), {
    //     onSuccess(data) {
    //         setUser(data);
    //     },
    // });
    return (
        <>
            <UserCard {...user!} />
            <Education {...user?.educations!} />
            <Award {...user?.awards!} />
            <Certificate {...user?.certificate!} />
            <Project {...user?.projects!} />
        </>
    );
}

export default UserDetail;
