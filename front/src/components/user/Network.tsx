import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getUsers } from "../../api/api";
import { IUser, usersState } from "./../../atoms";
import UserCard from "./UserCard";
function Network() {
    const [users, setUsers] = useRecoilState(usersState);
    const { isLoading } = useQuery(["users"], getUsers, {
        onSuccess(data) {
            setUsers(data!);
        },
    });

    return (
        <>
            {users?.map((user) => (
                <UserCard {...user} />
            ))}
        </>
    );
}

export default Network;
