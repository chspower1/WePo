import { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState } from "recoil";
import { IProject, usersState } from "../../atoms";
import axios from "axios";
import { type } from "os";
import { ProjectEditForm } from "./ProjectEditForm";


export default function Project(info: IProject[]) {
  const [isAdding, setIsAdding] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IProject>();

  function handleAdding() {
    setIsAdding((isAdding) => !isAdding);
  }

    const[projects,setProjects] = useState<IProject[]>([
        {
            title:"elice",
            startDate:new Date(),
            endDate:new Date(),
            description:"asd"
        }
    ])

  return (
    <>
      <h1>프로젝트</h1>
      <div>
        <ul>
            {projects.map((val:IProject,index) =>
                (
                    <li key={index}>
                        <h1>{val.title}</h1>
                    </li>
                )
            )}
        </ul>
      </div>
      <div>
        {isAdding && <ProjectEditForm setIsAdding={setIsAdding}/>}
        <button onClick={handleAdding}>추가</button>
      </div>
    </>
  );
}
