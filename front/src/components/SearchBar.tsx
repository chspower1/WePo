import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MagnifyingGlass } from "@styled-icons/foundation/MagnifyingGlass";
const SearchBox = styled.form`
    position: relative;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Input = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 25px;
    text-align: center;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
        outline: 2px solid ${(props) => props.theme.btnColor};
    }
`;
const Button = styled.button`
    position: absolute;
    right: 5px;
    color: ${(props) => props.theme.btnColor};
    transition: color 0.4s ease;
    &:hover {
        color: ${(props) => props.theme.accentColor};
    }
`;
export default function SearchBar() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigator = useNavigate();
    const onvalid = ({ search }: any) => {
        console.log(search);
        navigator(`/search/${search}`);
    };
    return (
        <SearchBox onSubmit={handleSubmit(onvalid)}>
            <Input
                type="text"
                placeholder="찾고싶은 정보를 검색해주세요!"
                {...register("search", {
                    required: true,
                })}
            />

            <Button>
                <MagnifyingGlass size={24} />
            </Button>
        </SearchBox>
    );
}
