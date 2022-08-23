import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import Project from "./project/Project";
import { getUser } from "../api/api";
import { isLoginState, IUser } from "./../atoms";
import { useRecoilState } from "recoil";
function Portfolio() {
    const { userId } = useParams();
    const navigator = useNavigate();
    const [isLogin, setLogin] = useRecoilState(isLoginState);
    const [user, setUser] = useState<IUser>();
    const { isLoading } = useQuery(["user"], () => getUser(userId!), {
        onSuccess(data) {
            setUser(data!);
        },
    });
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, []);
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
