import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUsers } from "../../api/api";
import { isLoginState, IUser, usersState } from "./../../atoms";
import UserCard from "./UserCard";
function Network() {
    const [users, setUsers] = useRecoilState(usersState);
    const isLogin = useRecoilValue(isLoginState);

    // API
    // const { isLoading } = useQuery(["users"], getUsers, {
    //     onSuccess(data) {
    //         setUsers(data!);
    //     },
    // });

    const navigator = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);
    return (
        <>
            {users?.map((user) => (
                <UserCard key={user.id} {...user} />
            ))}
        </>
    );
}

export default Network;
