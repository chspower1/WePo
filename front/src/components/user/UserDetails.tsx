import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  IProfile,
  IProject,
  isLoginState
} from "@/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import UserCard from "./UserCard";
import * as Mypage from "@styledComponents/CategoryStyled";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import CurrentBoard from "@components/category/CurrentBoard";
import { LoadingBox, LoadingIcon } from "./Network";
import { usersState } from "./../../atoms";

function UserDetails() {
  const navigator = useNavigate();
  const isLogin = useRecoilValue(isLoginState);

  const [curUser, setCurUser] = useRecoilState(curUserState);

  const location = useLocation();
  const pathName = location.pathname;
  //권한관리
  const { userSeq } = useParams();

  //User관련 State
  const users = useRecoilValue(usersState);
  const [profile, setProfile] = useState<IProfile>();
  const [educations, setEducations] = useState<IEducation[]>([]);
  const [awards, setAwards] = useState<IAward[]>([]);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);

  //API User정보 받아오기
  const { isLoading, data: user } = useQuery(
    ["newCurUser", userSeq],
    () => (pathName === "/mypage" ? getUser(curUser?.userId!) : getUser(parseInt(userSeq!))),
    {
      onSuccess(sucessUser) {
        setProfile({
          name: sucessUser?.name!,
          likes: sucessUser?.likes!,
          userId: sucessUser?.userId!,
          field: sucessUser?.field!,
          description: sucessUser?.description!,
          picture: sucessUser?.picture!,
          email: sucessUser?.email!,
        });
        setEducations(sucessUser?.educations!);
        setAwards(sucessUser?.awards!);
        setCertificates(sucessUser?.certificates!);
        setProjects(sucessUser?.projects!);
      },
    }
  );

  //로그인상태 확인
  useEffect(() => {
    if (!isLogin) {
      navigator("/login", { replace: true });
    }
  }, [isLogin]);
  useEffect(() => {
    // const checkUser = users.filter((user) => user.userId === userSeq!);
  }, []);
  const onDragEnd = async ({ draggableId, destination, source }: DropResult) => {
    if (destination?.droppableId !== source.droppableId) return;
    //드래그 필드가 Educations
    else if (destination?.droppableId === "educations") {
      setEducations((prev) => {
        const resultEducations = [...prev];
        const education = resultEducations[source.index];
        resultEducations.splice(source.index, 1);
        resultEducations.splice(destination?.index!, 0, education);

        mutationCategory(curUser?.userId!, Category.education, resultEducations); //API요청
        return resultEducations;
      });
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
    }
  };

  if (isLoading && !user)
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
          <Mypage.UserCardBox>
            {curUser && <UserCard profile={profile!} setProfile={setProfile} />}
          </Mypage.UserCardBox>
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
