import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getUsers } from "../../api/api";
import { isLoginState, usersState } from "../../atoms";
import UserCard from "./UserCard";
function Network() {
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
        <div>
            {isLoading ? "loding" : users?.map((user) => <UserCard key={user.id} {...user} />)}
        </div>
    );
}

export default Network;
