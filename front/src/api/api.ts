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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function UserLogin({ email, password }: ILogin) {
    try {
        const { data: loginUser } = await axios.post(`${BASE_URL}/user/login`, {
            email,
            password,
        });
        await sessionStorage.setItem("userToken", loginUser.token);
        return loginUser as IUser;
    } catch (err: any) {
        alert(err.response.data); // 수정예정
    }
}

interface IRegister {
    email: string;
    password: string;
    name: string;
    field: string[];
}
// 회원가입 완료
export async function createtUser({ email, password, name, field }: IRegister) {
    try {
        const { data } = await axios.post(`${BASE_URL}/user/register`, {
            email,
            password,
            name,
            field,
        });

        const newUser: IUser = await {
            ...data,
            description: "",
            createdAt: "",
            picture: "",
            updatedAt: "",
        };
        return newUser;
    } catch (err: any) {
        alert(err.response.data);
    }
}
//유저 정보 불러오기
export async function getUsers() {
    try {
        const { data: users } = await axios.get(`${BASE_URL}/user/list`, {
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
        const { data } = await axios.get(`${BASE_URL}/user/${userId}`, {
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
    name?: string;
    description?: string;
    field: string[];
    picture: File[];
}
// 유저 정보 수정
export async function updateUser(data: IUpdateUserProps, userId: number) {
    try {
        const formData = new FormData();
        for (let i in data.field) {
            data.field && formData.append("field", data.field[i]);
        }
        data.picture && formData.append("image", data.picture[0]);
        data.description && formData.append("description", data.description);
        data.name && formData.append("name", data.name);
        await axios
            .post(`${BASE_URL}/user/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                },
            })
    } catch (err) {
        console.log(err);
    }
}

export async function curUserToggleLike(userId: number) {
    try {
        await axios.put(
            `${BASE_URL}/user/togglelike/${userId}`,
            {},
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
                userId,
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

export async function mutationCategory(
    userId: number,
    category: Category,
    newCategories: IProject[] | IAward[] | ICertificate[] | IEducation[]
) {
    try {
        await axios.put(`${BASE_URL}/${category}`, {
            data: { userId, newCategories },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

export async function searchData(searchData: string) {
    try {
        const { data: result } = await axios.get(`${BASE_URL}/user/search/${searchData}`, {
            data: { searchData },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
            },
        });
        return result as IUser[];
    } catch (err) {
        console.log(err);
    }
}


//회원가입 이메일 인증
export async function approveRegister(userId: any, authCode: any) {
    try {
        await axios.post(`${BASE_URL}/user/register/${userId}/${authCode}`,)
    } catch (err) {
        console.log(err);
    }
}

//비밀번호 변경

export async function changePassword(oldPassword: any, newPassword: any) {
    try {
        const { data: result } = await axios.put(`${BASE_URL}/user/changePassword`,
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
                }
            }
        )
        return result
    } catch (err) {
        return (err);
    }

}