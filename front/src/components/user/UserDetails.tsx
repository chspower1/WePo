import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Education from "@education/Education";
import Award from "@award/Award";
import Certificate from "@certificate/Certificate";
import Project from "@project/Project";
import { Category, getUser, mutationCategory } from "@api/api";
import {
    curUserState,
    IAward,
    ICertificate,
    IEducation,
    IProject,
    isLoginState,
    IUser,
} from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./UserCard";
import styled from "styled-components";
import * as Mypage from "@styledComponents/CategoryStyled";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CurrentBoard from "@components/category/CurrentBoard";
import { LoadingBox, LoadingIcon } from "./Network";
function UserDetails() {
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);

    const [curUser, setCurUser] = useRecoilState(curUserState);

    const location = useLocation();
    const pathName = location.pathname;

    const { userSeq } = useParams();

    //User관련 State
    const [user, setUser] = useState<IUser>();
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [awards, setAwards] = useState<IAward[]>([]);
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);

    //API User정보 받아오기
    const { isLoading } = useQuery(
        ["newCurUser"],
        () => (pathName === "/mypage" ? getUser(curUser?.userId!) : getUser(parseInt(userSeq!))),
        {
            onSuccess(user) {
                setUser(user!);
                setEducations(user?.educations!);
                setAwards(user?.awards!);
                setCertificates(user?.certificates!);
                setProjects(user?.projects!);
            },
        }
    );

    //로그인상태 확인
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);

    //오류수정
    //다른 유저정보 보다 나의페이지 넘어오면 보던 유저의 나의 페이지가 나옴
    useEffect(() => {
        setUser(curUser!);
        setEducations(curUser?.educations!);
        setAwards(curUser?.awards!);
        setCertificates(curUser?.certificates!);
        setProjects(curUser?.projects!);
    }, [pathName]);

    useEffect(() => {}, [educations, projects, certificates, awards]);
    //드래그 시
    const onDragEnd = async ({ draggableId, destination, source }: DropResult) => {
        console.log(draggableId, destination, source);

        if (destination?.droppableId !== source.droppableId) return;
        //드래그 필드가 Educations
        else if (destination?.droppableId === "educations") {
            setEducations((prev) => {
                const resultEducations = [...prev];
                const education = resultEducations[source.index];
                resultEducations.splice(source.index, 1);
                resultEducations.splice(destination?.index!, 0, education);
                console.log("바꾸고 값 저장 전", resultEducations);

                mutationCategory(curUser?.userId!, Category.education, resultEducations); //API요청
                return resultEducations;
            });

            console.log("set하고 나온 educations", educations);
        }
        //드래그 필드가 awards
        else if (destination?.droppableId === "awards") {
            setAwards((prev) => {
                const resultAwards = [...prev];
                const award = resultAwards[source.index];
                resultAwards.splice(source.index, 1);
                resultAwards.splice(destination?.index!, 0, award);

                mutationCategory(curUser?.userId!, Category.award, resultAwards); //API요청
                return resultAwards;
            });

            console.log(awards);
        }
        //드래그 필드가 certificates
        else if (destination?.droppableId === "certificates") {
            setCertificates((prev) => {
                const resultCertificates = [...prev];
                const certificate = resultCertificates[source.index];
                resultCertificates.splice(source.index, 1);
                resultCertificates.splice(destination?.index!, 0, certificate);
                mutationCategory(curUser?.userId!, Category.certificate, resultCertificates); //API요청
                return resultCertificates;
            });
            console.log(certificates);
        }
        //드래그 필드가 project
        else if (destination?.droppableId === "projects") {
            setProjects((prev) => {
                const resultProjects = [...prev];
                const project = resultProjects[source.index];
                resultProjects.splice(source.index, 1);
                resultProjects.splice(destination?.index!, 0, project);
                mutationCategory(curUser?.userId!, Category.project, resultProjects); //API요청
                return resultProjects;
            });
            console.log(projects);
        }
    };
    useEffect(() => {
        setUser((prev: any) => {
            const newUser = { ...prev };
            newUser.name = curUser?.name;
            newUser.description = curUser?.description;
            newUser.field = curUser?.field;
            return newUser;
        });
    }, [curUser?.name, curUser?.description, curUser?.field]);

    if (!user)
        // undefined 방지
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        );
    if (isLoading)
        // undefined 방지
        return (
            <LoadingBox>
                <LoadingIcon />
                Loading...
            </LoadingBox>
        );
    return (
        <>
            <Mypage.Root>
                <Mypage.MyPortWrap>
                    <Mypage.UserCardBox>{curUser && <UserCard {...user} />}</Mypage.UserCardBox>
                    <Mypage.Wrap>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <CurrentBoard
                                educations={educations}
                                awards={awards}
                                certificates={certificates}
                                projects={projects}
                            />
                            <Education educations={educations} setEducations={setEducations} />
                            <Award awards={awards} setAwards={setAwards} />
                            <Certificate
                                certificates={certificates}
                                setCertificates={setCertificates}
                            />
                            <Project projects={projects} setProjects={setProjects} />
                        </DragDropContext>
                    </Mypage.Wrap>
                </Mypage.MyPortWrap>
            </Mypage.Root>
        </>
    );
}

export default UserDetails;
