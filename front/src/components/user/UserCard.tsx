import { useState } from "react";
import { curUserState, IUser } from "./../../atoms";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getUser } from "../../api/api";
import User from "./MyProfile";
function UserCard({ id, name, email, description }: IUser) {
    const curUser = useRecoilValue(curUserState);
    const valid = id === curUser.id;
    const [onEdit, setOnEdit] = useState(false);
    const onClickEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOnEdit(true);
    };
    return (
        <>
            <div>
                <h1>{name}</h1>
                <h3>{email}</h3>
                <p>{description}</p>
                
                <Link to={id}>
                    <span>포트폴리오 보러가기</span>
                </Link>
                {valid && <button onClick={onClickEdit}>edit</button>}
            </div>
        </>
    );
}

export default UserCard;
