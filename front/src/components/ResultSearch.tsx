import { searchData } from "@api/api";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IUser } from "@/atoms";
import { useParams } from "react-router-dom";
import { NetworkContainer } from "@user/Network";
import UserCard from "@user/UserCard";
import styled from "styled-components";
const Test = styled.div`
    margin-top: 500px;
`;
export default function ResultSearch() {
    const { params } = useParams();
    console.log(params);
    const [users, setUsers] = useState<IUser[]>();
    const { isLoading } = useQuery("resultSearch", () => searchData(params!), {
        onSuccess(data) {
            setUsers(data!);
        },
    });
    if (isLoading)
        return (
            <Test>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
                <>d</>
            </Test>
        );
    return (
        <Test>
            <NetworkContainer>
                <div>검색된 결과{users?.length}</div>
                {users?.map((user) => (
                    <UserCard key={user.userId} {...user} />
                ))}
            </NetworkContainer>
        </Test>
    );
}
