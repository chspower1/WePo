import { ILogin } from "../components/user/LoginForm";
import { isLoginState, IUser, usersState } from "./../atoms";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export async function Login({ email, password }: ILogin) {
    try {
        // const response = await axios.post("/post/login", {
        //     email,
        //     password,
        // });
        if (true) return true;
        else return false;
    } catch (err) {
        console.log(err);
    }
}

export async function createtUser({ email, password, name }: IUser) {
    try {
        const { data: newUser } = await axios.post("/user/register", {
            email,
            password,
            name,
        });
        if (newUser) {
            return newUser as IUser;
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getUsers() {
    try {
        const { data: users } = await axios.get(`/get/users`);
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(id: string) {
    try {
        const { data: user } = await axios.get(`get/user/${id}`);
        return user as IUser;
    } catch (err) {
        console.log(err);
    }
}
