import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
	userId: {
		type: String,  //user의 id 해당되는 value 넣어줘서
		required: true,
	},
	// 프로젝트명
    title: { 
		type: String, 
		required: true, 
	},
	// 시작일
    startDate: { 
		type: Date,   
		required: true, 
	},
	// 종료일
	endDate: { 
		type: Date,  
		required: true, 
	},
	// 설명
    description: { 
		type: String,
		required: true, 
	},
	/** // 나중에 추가 구현할 것들
	links: { 
		type: String,
	},
	tags: { 
		type: Array,
	},
*/
	},
	{
	timestamps: true,
	}
);
const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };