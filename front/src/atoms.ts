import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface IUser {
    _id?: string;
    token: string;
    email: string;
    name: string;
    password?: string;
    picture?: string;
    description: string;
    field: EHopeField[];
    likes: any[];
    views: number;
    userId: number;
    educations?: IEducation[];
    awards?: IAward[];
    certificates?: ICertificate[];
    projects?: IProject[];
    _v?: number;
}
export enum EHopeField {
    undefined = "미정",
    backEnd = "백엔드",
    frontEnd = "프론트엔드",
    dataAnalysis = "데이터분석",
    AI = "인공지능",
}
export interface IEducation {
    _id?: string;
    eduId: string;
    userId?: string;
    school: string;
    major: string;
    status: EduStatus;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export enum EduStatus {
    attending = "재학중",
    bachelor = "학사졸업",
    master = "석사졸업",
    doctor = "박사졸업",
}
export interface IAward {
    _id?: string;
    awardId: string;
    userId?: string;
    title: string;
    grade: string;
    org: string;
    date: Date;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export interface ICertificate {
    _id?: string;
    certId: string;
    userId?: string;
    title: string;
    date: Date;
    org: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
export interface IProject {
    _id?: string;
    projectId: string;
    userId?: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}
const { persistAtom } = recoilPersist();
// export interface ICerUser {
//     _id?: string;
//     description: string;
//     email: string;
//     errorMessage: string | null;
//     name: string;
//     token: string;
//     userId: string;
//     userSeq: number;
// }
export const curUserState = atom<IUser | null>({
    key: "curUser",
    default: null,
    effects_UNSTABLE: [persistAtom],
});
export const usersState = atom<IUser[]>({
    key: "user",
    default: [],
});

export const isDarkState = atom({
    key: "isDark",
    default: false,
});

export const isLoginState = selector({
    key: "isLogin",
    get: ({ get }) => {
        const curUser = get(curUserState);
        console.log(curUser);
        const checkLogin = curUser?.token ? true : false;
        return checkLogin;
    },
});

export const checkedBoxValue = atom<string[]>({
    key: "checkedBoxValue",
    default: [],
});

export const hopeJob = selector({
    key: "hopeJob",
    get: ({ get }) => {
        const currentHope = get(checkedBoxValue);
        let userState = get(usersState);
        for (const duty of currentHope) {
            userState = userState.filter((elem) => {
                return elem.field.findIndex((elem) => elem === duty) >= 0;
            });
        }
        return userState;
    },
});
