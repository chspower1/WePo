import { useState } from "react";
import { IUser } from "./../../atoms";
function UserCard({ name, email, description }: IUser) {
    const [curUser, setCuruser] = useState();
    return (
        <>
            <div>
                <h1>{name}</h1>
                <h3>{email}</h3>
                <p>{description}</p>
                <button>edit</button>
            </div>
        </>
    );
}

export default UserCard;
