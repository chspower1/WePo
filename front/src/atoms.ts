import { atom, selector } from "recoil";

export interface IUser {
    id: string;
    token: string;
    email: string;
    name: string;
    password: string;
    picture: string;
    description: string;
    educations?: IEducation[];
    awards?: IAward[];
    certificate?: ICertificate[];
    projects?: IProject[];
}
export interface IEducation {
    school: string;
    major: string;
    status: EduStatus;
}
export enum EduStatus {
    attending = "재학중",
    bachelor = "학사졸업",
    master = "석사졸업",
    doctor = "박사졸업",
}
export interface IAward {
    title: string;
    grade: string;
    org: string;
    date: Date;
    description: string;
}
export interface ICertificate {
    title: string;
    date: Date;
    org: string;
    description: string;
}
export interface IProject {
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
}

export const curUserState = atom<IUser>({
    key: "curUser",
    default: { id: "", token: "", email: "", name: "", password: "", picture: "", description: "" },
});
export const usersState = atom<IUser[]>({
    key: "user",
    default: [
        {
            id: "1",
            token: "1",
            email: "1",
            name: "1",
            password: "1",
            picture: "1",
            description: "1",
        },
        {
            id: "2",
            token: "2",
            email: "2",
            name: "2",
            password: "2",
            picture: "2",
            description: "2",
        },
        {
            id: "3",
            token: "3",
            email: "3",
            name: "3",
            password: "3",
            picture: "3",
            description: "3",
        },
    ],
});

export const isDarkState = atom({
    key: "isDark",
    default: false,
});

export const isLoginState = atom({
    key: "isLogin",
    default: false,
});
