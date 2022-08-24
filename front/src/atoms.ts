import { atom, selector } from "recoil";

export interface IUser {
    id: string;
    token: string;
    email: string;
    name: string;
    password: string;
    picture: string;
    description: string;
    educations: IEducation[];
    awards: IAward[];
    certificate: ICertificate[];
    projects: IProject[];
}
export interface IEducation {
    school: string;
    major: string;
    status: EduStatus | "";
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
    date: string;
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

export const usersState = atom<IUser[]>({
    key: "user",
    default: [],
});

export const isDarkState = atom({
    key: "isDark",
    default: false,
});

export const isLoginState = atom({
    key: "isLogin",
    default: false,
});

