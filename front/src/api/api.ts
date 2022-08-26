import { ILogin } from "../components/user/LoginForm";
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
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Certificate from "./../components/certificate/Certificate";

export async function UserLogin({ email, password }: ILogin) {
    try {
        const { data: newUser } = await axios.post("http://localhost:5001/user/login", {
            email,
            password,
        });
        await sessionStorage.setItem("userToken", newUser.token);
        return newUser as IUser;
    } catch (err) {
        alert("dd");
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
        const { data: users } = await axios.get(`http://localhost:5001/userlist`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(id: string) {
    try {
        const { data } = await axios.get(`http://localhost:5001/users/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        console.log("API", data);
        const { 0: user } = data;
        return user as IUser;
    } catch (err) {
        console.log(err);
    }
}
// -----------------------MVP 추가 수정 ----------------------
// Award 추가,수정
export async function addAward(data: IAward, id: string) {
    try {
        await axios.post(
            `http://localhost:5001/award`,
            { ...data, id },
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
export async function updateAward(data: IAward, id: string) {
    try {
        await axios.put(`http://localhost:5001/award/${id}`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}

// Certificate 추가,수정
export async function addCertificate(data: ICertificate, id: string) {
    try {
        await axios.post(
            `http://localhost:5001/certificate`,
            { ...data, id },
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
export async function updateCertificate(data: ICertificate, id: string) {
    try {
        await axios.put(`http://localhost:5001/certificate/${id}`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}

// Education 추가,수정
export async function addEducation(data: IEducation, id: string) {
    try {
        await axios.post(
            `http://localhost:5001/education`,
            { ...data, id },
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
export async function updateEducation(data: IEducation, id: string) {
    try {
        await axios.put(
            `http://localhost:5001/education/${id}`,
            { ...data, id },
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
// Project 추가,수정
export async function addProject(data: IProject, id: string) {
    try {
        await axios.post(
            `http://localhost:5001/project`,
            { ...data, id },
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
export async function updateProject(data: IProject, userId: string, projectId: string) {
    try {
        await axios.put(
            `http://localhost:5001/project/${projectId}`,
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
