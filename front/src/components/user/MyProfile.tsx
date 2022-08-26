import { useState } from "react";
import { curUserState, IUser } from "../../atoms";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getUser } from "../../api/api";
function MyProfile() {
    const curUser = useRecoilValue(curUserState);

    return (
        <>
            {curUser && (
                <div>
                    <h1>{curUser.name}</h1>
                    <h3>{curUser.email}</h3>
                    <p>{curUser.description}</p>
                    <button>edit</button>
                </div>
            )}
        </>
    );
}

export default MyProfile;
