import { ILogin } from "../components/user/LoginForm";
import { IEducation, isLoginState, IUser, usersState } from "./../atoms";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

// 에러.. type을 못잡겠음
export async function UserLogin({ email, password }: ILogin) {
    try {
        const newUser = await axios.post("/user/login", {
            email,
            password,
        });
        console.log(newUser);
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

// 회원가입 완료
export async function createtUser({ email, password, name }: IUser) {
    try {
        const { data } = await axios.post("http://localhost:5001/user/register", {
            email,
            password,
            name,
        });
        console.log(data);
        const newUser: IUser = await {
            ...data,
            description: "",
            createdAt: "",
            picture: "",
            updatedAt: "",
        };
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

export async function getUsers() {
    try {
        const { data: users } = await axios.get(`http://localhost:5001/userlist`);
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(id: any) {
    try {
        const { data: user } = await axios.get(`http://localhost:5001/users/${id}`);
        return user as IUser;
    } catch (err) {
        console.log(err);
    }
}

export async function addEducation(data: IEducation) {
    try {
        axios.post("/education", { ...data });
    } catch (err) {
        console.log(err);
    }
}
export async function updateEducation(data: IEducation) {
    try {
        axios.put("/education", { ...data });
    } catch (err) {
        console.log(err);
    }
}
