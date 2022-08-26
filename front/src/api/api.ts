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
        console.log(users);
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(userSeq: number) {
    try {
        console.log(userSeq);
        const { data } = await axios.get(`http://localhost:5001/users/${userSeq}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });

        return data as IUser;
    } catch (err) {
        console.log(err);
    }
}
export async function updateUser(data: any, userSeq: number) {
    try {
        console.log(userSeq);
        await axios.put(
            `http://localhost:5001/users/${userSeq}`,
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
        await axios.post(
            `http://localhost:5001/award`,
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
            `http://localhost:5001/award/${awardId}`,
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
export async function deleteAward(awardId: string) {
    try {
        await axios.delete(`http://localhost:5001/award/${awardId}`, {
            data: {
                userId: awardId,
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
            `http://localhost:5001/certificate`,
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
        await axios.put(
            `http://localhost:5001/certificate/${certificateId}`,
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
export async function deleteCertificate(certificateId: string) {
    try {
        await axios.delete(`http://localhost:5001/certificate/${certificateId}`, {
            data: {
                userId: certificateId,
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

// Education 추가,수정
export async function addEducation(data: IEducation) {
    try {
        await axios.post(
            `http://localhost:5001/education`,
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
            `http://localhost:5001/education/${educationId}`,
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
export async function deleteEducation(educationId: string) {
    try {
        await axios.delete(`http://localhost:5001/education/${educationId}`, {
            data: {
                userId: educationId,
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
            `http://localhost:5001/project`,
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
export async function deleteProject(projectId: string) {
    try {
        await axios.delete(`http://localhost:5001/project/${projectId}`, {
            data: {
                userId: projectId,
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
