import { ILogin } from "@user/LoginForm";
import {
    curUserState,
    IAward,
    ICertificate,
    IEducation,
    IProject,
    isLoginState,
    IUser,
    usersState,
} from "./../atoms";
import axios, { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Certificate from "@certificate/Certificate";

const BASE_URL = `http://${window.location.hostname}:5001`;

export async function UserLogin({ email, password }: ILogin) {
    try {
        const { data: loginUser } = await axios.post(`${BASE_URL}/user/login`, {
            email,
            password,
        });
        await sessionStorage.setItem("userToken", loginUser.token);
        return loginUser as IUser;
    } catch (err) {
        alert("로그인 정보가 옳지 않습니다!"); // 수정예정
        console.log(err);
    }
}

// 회원가입 완료
export async function createtUser({ email, password, name }: IUser) {
    try {
        const { data } = await axios.post(`${BASE_URL}/user/register`, {
            email,
            password,
            name,
        });
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
//유저 정보 불러오기
export async function getUsers() {
    try {
        const { data: users } = await axios.get(`${BASE_URL}/userlist`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
//유저 리스트 정보 불러오기
export async function getUser(userId: number) {
    try {
        const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        return data as IUser;
    } catch (err) {
        console.log(err);
    }
}
interface IUpdateUserProps {
    name: string;
    description: string;
}
// 유저 정보 수정
export async function updateUser(data: IUpdateUserProps, userId: number) {
    try {
        await axios.put(
            `${BASE_URL}/users/${userId}`,
            { ...data },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
}

//카테고리
export enum Category {
    project = "project",
    award = "award",
    certificate = "certificate",
    education = "education",
}

// MVP 추가,수정기능 API
export async function addData(
    data: IProject | IAward | ICertificate | IEducation,
    category: Category
) {
    try {
        await axios.post(
            `${BASE_URL}/${category}`,
            { ...data },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
}
export async function updateData(
    data: IProject | IAward | ICertificate | IEducation,
    category: Category,
    userId: number,
    projectId: string
) {
    try {
        await axios.put(
            `${BASE_URL}/${category}/${projectId}`,
            { ...data, userId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
}
export async function deleteData(category: Category, projectId: string, userId: number) {
    try {
        await axios.delete(`${BASE_URL}/${category}/${projectId}`, {
            data: {
                userId: userId,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
    } catch (err) {
        console.log(err);
    }
}
