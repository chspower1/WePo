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

const BASE_URL = `http://${window.location.hostname}:5001`;
export async function UserLogin({ email, password }: ILogin) {
    try {
        const { data: newUser } = await axios.post(`${BASE_URL}/user/login`, {
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

export async function getUsers() {
    try {
        const { data: users } = await axios.get(`${BASE_URL}/userlist`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        console.log(users);
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
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
export async function updateUser(data: any, userId: number) {
    try {
        console.log(userId);
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

// -----------------------MVP 추가 수정 ----------------------
// Award 추가,수정
export async function addAward(data: IAward) {
    try {
        return await axios.post(
            `${BASE_URL}/award`,
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
export async function updateAward(data: any, userId: number, awardId: string) {
    try {
        console.log("데이터", data, "유저아이디", userId, "어워드아이디", awardId);
        await axios.put(
            `${BASE_URL}/award/${awardId}`,
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
export async function deleteAward(awardId: string, userId: number) {
    try {
        await axios.delete(`${BASE_URL}/award/${awardId}`, {
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

// Certificate 추가,수정
export async function addCertificate(data: ICertificate) {
    try {
        await axios.post(
            `${BASE_URL}/certificate`,
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
export async function updateCertificate(data: ICertificate, userId: number, certificateId: string) {
    try {
        await axios
            .put(
                `${BASE_URL}/certificate/${certificateId}`,
                { ...data, userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                    },
                }
            )
            .then((res) => console.log(res));
    } catch (err) {
        console.log(err);
    }
}
export async function deleteCertificate(certificateId: string, userId: number) {
    try {
        console.log("certificateId", certificateId);
        await axios
            .delete(`${BASE_URL}/certificate/${certificateId}`, {
                data: {
                    userId: userId,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                },
            })
            .then((res) => console.log("res", res));
    } catch (err) {
        console.log(err);
    }
}

// Education 추가,수정
export async function addEducation(data: IEducation) {
    try {
        await axios.post(
            `${BASE_URL}/education`,
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
export async function updateEducation(data: IEducation, userId: string, educationId: string) {
    try {
        await axios.put(
            `${BASE_URL}/education/${educationId}`,
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
export async function deleteEducation(educationId: string, userId: number) {
    try {
        await axios.delete(`${BASE_URL}/education/${educationId}`, {
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
// Project 추가,수정
export async function addProject(data: IProject) {
    try {
        await axios.post(
            `${BASE_URL}/project`,
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
export async function updateProject(data: IProject, userId: number, projectId: string) {
    try {
        await axios.put(
            `${BASE_URL}/project/${projectId}`,
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
export async function deleteProject(projectId: string, userId: number) {
    try {
        await axios.delete(`${BASE_URL}/project/${projectId}`, {
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
