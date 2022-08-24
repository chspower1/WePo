import { useState } from "react";
import { curUserState, IUser } from "./../../atoms";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
function UserCard({ id, name, email, description }: IUser) {
    const curUser = useRecoilValue(curUserState);
    const valid = id === curUser.id;
    return (
        <>
            <div>
                <h1>{name}</h1>
                <h3>{email}</h3>
                <p>{description}</p>
                {valid && <button>edit</button>}
            </div>
        </>
    );
}

export default UserCard;
