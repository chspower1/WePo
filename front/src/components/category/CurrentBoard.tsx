import React from "react";
import * as CurBoard from "@styledComponents/CategoryStyled";
import styled from "styled-components";
import { IAward, ICertificate, IEducation, IProject, IUser } from "@/atoms";
const Container = styled(CurBoard.Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 30px;
`;
const ContentBox = styled(CurBoard.ContentBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;
const Title = styled(CurBoard.Title)`
    width: 100%;
    font-size: 16px;
    text-align: center;
`;
const ContentAccent = styled(CurBoard.ContentAccent)`
    width: 100%;
    text-align: center;
    font-size: 20px;
`;

interface ICurBoardProps {
    educations: IEducation[];
    certificates: ICertificate[];
    awards: IAward[];
    projects: IProject[];
}
export default function CurrentBoard({
    educations,
    certificates,
    awards,
    projects,
}: ICurBoardProps) {
    return (
        <Container>
            <ContentBox>
                <Title>학력</Title>
                <ContentAccent>{educations?.length}</ContentAccent>
            </ContentBox>
            <ContentBox>
                <Title>수상경력</Title>
                <ContentAccent>{certificates?.length}</ContentAccent>
            </ContentBox>
            <ContentBox>
                <Title>자격증</Title>
                <ContentAccent>{awards?.length}</ContentAccent>
            </ContentBox>
            <ContentBox>
                <Title>프로젝트</Title>
                <ContentAccent>{projects?.length}</ContentAccent>
            </ContentBox>
        </Container>
    );
}
