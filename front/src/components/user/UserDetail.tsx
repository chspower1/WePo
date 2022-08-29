import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Award from "@award/Award";
import Certificate from "@certificate/Certificate";
import Education from "@education/Education";
import Project from "@project/Project";
import UserCard from "./UserCard";
import { IAward, ICertificate, IEducation, IProject, isLoginState, IUser } from "@/atoms";
import { useQuery } from "react-query";
import { getUser } from "@api/api";
import styled from "styled-components";
import { MyPortWrap, Wrap, UserCardBox, Root } from "@styledComponents/CategoryStyled";
import { useRecoilValue } from "recoil";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

function UserDetail() {
    const { userSeq } = useParams();

    const navigator = useNavigate();
    const isLogin = useRecoilValue(isLoginState);
    const [educations, setEducations] = useState<IEducation[]>([]);
    const [awards, setAwards] = useState<IAward[]>([]);
    const [certificates, setCertificates] = useState<ICertificate[]>([]);
    const [projects, setProjects] = useState<IProject[]>([]);
    const { isLoading, data } = useQuery(["UserInfo"], () => getUser(parseInt(userSeq!)!), {
        onSuccess(user) {
            setEducations((prev) => user?.educations!);
            setAwards((prev) => user?.awards!);
            setCertificates((prev) => user?.certificates!);
            setProjects((prev) => user?.projects!);
        },
    });

    console.log(educations, awards, certificates, projects);
    useEffect(() => {
        if (!isLogin) {
            navigator("/login", { replace: true });
        }
    }, [isLogin]);

    //드래그 시
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        console.log(draggableId, destination, source);

        // //state
        // setEducations((prev) => {
        //     const resultEducations = [...prev];
        //     const education = resultEducations[source.index];
        //     resultEducations.splice(source.index, 1);
        //     resultEducations.splice(destination?.index!, 0, education);
        //     return resultEducations;
        // });
        // //API요청
        // mutationCategory(curUser?.userId!, Category.education, educations);
        // console.log(educations);
    };
    if (!(educations && awards && certificates && projects)) return <></>; //이거 없으면 마이페이지에서 로그아웃하면 흰화면이 뜸
    if (isLoading) return <></>;
    return (
        <>
            {isLoading ? (
                "로딩중"
            ) : (
                <Root>
                    <MyPortWrap>
                        {data && (
                            <>
                                <UserCardBox>
                                    <UserCard {...data!} />
                                </UserCardBox>
                                <Wrap>
                                    <Education
                                        educations={educations}
                                        setEducations={setEducations}
                                    />
                                    <Award awards={awards} setAwards={setAwards} />
                                    <Certificate
                                        certificates={certificates}
                                        setCertificates={setCertificates}
                                    />
                                    <Project projects={projects} setProjects={setProjects} />
                                </Wrap>
                            </>
                        )}
                    </MyPortWrap>
                </Root>
            )}
        </>
    );
}

export default UserDetail;
