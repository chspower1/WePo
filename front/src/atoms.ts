import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface ILike {
    userId: number;
}
export interface IUser {
    _id?: string;
    token: string;
    email: string;
    name: string;
    password?: string;
    picture?: string;
    description: string;
    field: string[];
    likes: number[];
    views: number;
    userId: number;
    educations?: IEducation[];
    awards?: IAward[];
    certificates?: ICertificate[];
    projects?: IProject[];
    _v?: number;
}

export interface IEducation {
    _id?: string;
    eduId: string;
    userId?: number;
    order?: number;
    school: string;
    major: string;
    status: EduStatus | string;
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
    userId?: number;
    order?: number;
    title: string;
    grade: string;
    org: string;
    date: Date | string;
    description: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    __v?: number;
}
export interface ICertificate {
    _id?: string;
    certId: string;
    userId?: number;
    title: string;
    order?: number;
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
    userId?: number;
    title: string;
    order?: number;
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
//     userId: snumber
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
        const checkLogin = sessionStorage.getItem("userToken") && curUser?.token ? true : false;
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
export const searchWordState = atom<string>({
    key: "searchData",
    default: "",
});
export const searchUsersState = selector<IUser[]>({
    key: "searchUsers",
    get: ({ get }) => {
        const currentUsers = get(usersState);
        const newCurUsers = currentUsers?.filter((user) => {
            const { name, projects, awards, educations, certificates, description, email, field } =
                user;
            const searchWord = get(searchWordState);
            console.log("검색어", searchWord);
            if (name.includes(searchWord)) return user;
            else if (email.includes(searchWord)) return user;
            else if (field.includes(searchWord)) return user;
            else if (description.includes(searchWord)) return user;
            else if (
                projects?.filter((project) => {
                    if (project.title.includes(searchWord)) return project;
                    else if (project.description.includes(searchWord)) return project;
                })
            )
                return user;
            else if (
                awards?.filter((award) => {
                    if (award.title.includes(searchWord)) return award;
                    else if (award.description.includes(searchWord)) return award;
                })
            )
                return user;
            else if (
                educations?.filter((education) => {
                    if (education.major.includes(searchWord)) return education;
                    else if (education.school.includes(searchWord)) return education;
                })
            )
                return user;
            else if (
                projects?.filter((project) => {
                    if (project.title.includes(searchWord)) return project;
                    else if (project.description.includes(searchWord)) return project;
                })
            )
                return user;
            else if (
                certificates?.filter((certificate) => {
                    if (certificate.title.includes(searchWord)) return certificate;
                    else if (certificate.description.includes(searchWord)) return certificate;
                })
            )
                return user;
        });
        console.log("검색엔진 돌아가는중", newCurUsers);
        return newCurUsers;
    },
});
