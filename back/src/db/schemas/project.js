import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
	userId: {
		type: String,  //user의 id 해당되는 value 넣어줘서
		required: true,
	  },
    title: { 
		type: String, 
		required: true, 
	},
    startDate: { 
		type: Date,   
		required: true, 
	},
	endDate: { 
		type: Date,  
		required: true, 
	},
    description: { 
		type: String,
		required: true, 
	},
	/**
	links: { 
		type: String,
	},
	tags: { 
		type: Array,
	},
*/
  },
);

const ProjectModel = model("User", ProjectSchema);

export { ProjectModel };
