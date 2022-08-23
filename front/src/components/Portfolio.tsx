import { useQuery } from "react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import Project from "./project/Project";
import { getUser } from "../api/api";
import { IUser } from "./../atoms";
function Portfolio() {
    const { userId } = useParams();
    const [user, setUser] = useState<IUser>();
    const { isLoading } = useQuery(["user"], () => getUser(userId!), {
        onSuccess(data) {
            setUser(data!);
        },
    });
    return (
        <>
            {isLoading ? (
                "loding"
            ) : (
                <>
                    <h1>{user?.name}</h1>
                    <Education {...user?.educations!} />
                    <Award {...user?.awards!} />
                    <Certificate {...user?.certificate!} />
                    <Project {...user?.projects!} />
                </>
            )}
        </>
    );
}

export default Portfolio;
