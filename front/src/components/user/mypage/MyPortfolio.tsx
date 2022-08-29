import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
    const { isLoading } = useQuery(["newCurUser"], () => getUser(curUser?.userId!), {
        onSuccess(user) {
            setEducations(user?.educations!);
            setAwards(user?.awards!);
            setCertificates(user?.certificates!);
            setProjects(user?.projects!);
        },
    });

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
                mutationCategory(curUser?.userId!, Category.education, resultEducations);
                return resultEducations;
            });

            console.log("set하고 나온 educations", educations);
            //API요청
            // mutationCategory(curUser?.userId!, Category.education, educations);
        }
        if (destination?.droppableId === "awards") {
            setAwards((prev) => {
                const resultAwards = [...prev];
                const award = resultAwards[source.index];
                resultAwards.splice(source.index, 1);
                resultAwards.splice(destination?.index!, 0, award);
                mutationCategory(curUser?.userId!, Category.award, resultAwards);
                return resultAwards;
            });
            //API요청
            // mutationCategory(curUser?.userId!, Category.award, awards);
            console.log(awards);
        }
        if (destination?.droppableId === "certificates") {
            setCertificates((prev) => {
                const resultCertificates = [...prev];
                const certificate = resultCertificates[source.index];
                resultCertificates.splice(source.index, 1);
                resultCertificates.splice(destination?.index!, 0, certificate);
                mutationCategory(curUser?.userId!, Category.certificate, resultCertificates);
                return resultCertificates;
            });
            //API요청
            // mutationCategory(curUser?.userId!, Category.certificate, certificates);
            console.log(certificates);
        }
        if (destination?.droppableId === "project") {
            setProjects((prev) => {
                const resultProjects = [...prev];
                const project = resultProjects[source.index];
                resultProjects.splice(source.index, 1);
                resultProjects.splice(destination?.index!, 0, project);
                mutationCategory(curUser?.userId!, Category.project, resultProjects);
                return resultProjects;
            });
            //API요청
            // mutationCategory(curUser?.userId!, Category.project, projects);
            console.log(projects);
        }
    };

    if (!curUser) return <></>; //이거 없으면 마이페이지에서 로그아웃하면 흰화면이 뜸
    if (isLoading) return <></>;
    return (
        <>
            <Mypage.Root>
                <Mypage.MyPortWrap>
                    <Mypage.UserCardBox>{curUser && <UserCard {...curUser} />}</Mypage.UserCardBox>
                    <Mypage.Wrap>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="educations">
                                {(magic) => (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        <Education
                                            educations={educations}
                                            setEducations={setEducations}
                                        />
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="awards">
                                {(magic) => (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        <Award awards={awards} setAwards={setAwards} />
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="certificates">
                                {(magic) => (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        <Certificate
                                            certificates={certificates}
                                            setCertificates={setCertificates}
                                        />
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="project">
                                {(magic) => (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        <Project projects={projects} setProjects={setProjects} />
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Mypage.Wrap>
                </Mypage.MyPortWrap>
            </Mypage.Root>
        </>
    );
}

export default MyPortfolio;
