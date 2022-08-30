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
import UserCard from "../UserCard";
import UserDetail from "../UserDetail";
import styled from "styled-components";
import * as Mypage from "@styledComponents/CategoryStyled";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
function MyPortfolio() {
    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const [curUser, setCurUser] = useRecoilState(curUserState);

    const location = useLocation();
    const pathName = location.pathname;

    const { userSeq } = useParams();
    console.log(userSeq!);
    console.log(pathName);
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
    const [user, setUser] = useState<IUser>();
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [awards, setAwards] = useState<IAward[]>([]);
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);

    useEffect(() => {}, [educations, projects, certificates, awards]);
    //드래그 시
    const onDragEnd = async ({ draggableId, destination, source }: DropResult) => {
        console.log(draggableId, destination, source);

        //state
        if (destination?.droppableId === "educations") {
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
        if (destination?.droppableId === "awards") {
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
        if (destination?.droppableId === "certificates") {
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
        if (destination?.droppableId === "project") {
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

    if (!user) return <></>; // undefined 방지
    if (isLoading) return <></>; // undefined 방지
    return (
        <>
            <Mypage.Root>
                <Mypage.MyPortWrap>
                    <Mypage.UserCardBox>{curUser && <UserCard {...user} />}</Mypage.UserCardBox>
                    <Mypage.Wrap>
                        <DragDropContext onDragEnd={onDragEnd}>
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

export default MyPortfolio;
