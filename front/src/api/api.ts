import { ILogin } from "../components/user/LoginForm";
import { IUser } from "./../atoms";
import axios from "axios";
export async function Login({ email, password }: ILogin) {}

export async function putUser({ email, password, name }: IUser) {
    await axios.put("/register", {
        data: email,
        password,
        name,
    });
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
