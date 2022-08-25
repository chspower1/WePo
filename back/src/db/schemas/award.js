import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
	userId: {
		type: String,  //user의 id 해당되는 value 넣어줘서
		required: true,
	},
	//대회명
    title: { 
		type: String, 
		required: true, 
	},
	//수상 등급 (우수 최우수 대상 참여 등등)
    grade: { 
		type: String,
		required: true, 
	},
	//수상 기관
    org: { 
		type: String,
		required: true, 
	},
	//수상일자
	date: { 
		type: Date,
		required: true,
	},
	//설명
	description: { 
		type: String,
	},
  },
	{
	timestamps: true,
	}
);
const AwardModel = model("Award", AwardSchema);

export { AwardModel };
