import { IProject } from "./../../atoms";
export default function ProjectCard(project: IProject, index: number) {
    return (
        <MvpContentBox key={index}>
            {targetIndex !== index && (
                <>
                    <MvpContentAccent>{project.title}</MvpContentAccent>
                    <MvpContentDetail>{project.description}</MvpContentDetail>
                    <MvpContentDate>{`${project.startDate} ~ ${project.endDate}`}</MvpContentDate>
                    {curUser && pathName === "/mypage" && targetIndex !== index && (
                        <>
                            <MvpEditButton
                                onClick={() => {
                                    setIsEditing(true);
                                    setTargetIndex(index);
                                }}
                            >
                                <Pencil color="#3687FF" />
                            </MvpEditButton>
                            <MvpDeleteButton
                                onClick={() => {
                                    onClickDeleteBtn(project, index);
                                }}
                            >
                                <Trash2 color="#3687FF" />
                            </MvpDeleteButton>
                        </>
                    )}
                </>
            )}
            {isEditing && targetIndex == index && (
                <ProjectEditForm
                    index={index}
                    projects={projects}
                    setProjects={setProjects}
                    setEditing={setEditing}
                    setIsEditing={setIsEditing}
                    setTargetIndex={setTargetIndex}
                    userSeq={project.userId}
                    _id={project._id}
                />
            )}
        </MvpContentBox>
    );
}
