import { create } from "zustand";
import { prepFeedbackInterface, prepInterface } from "@/typeInterfaces/prepInterface";


const defaultPrepData: prepInterface = {
	_id: "",
	userId: "",
	prepType: "Interview",
	prepTitle: "",
	numberOfQuestions: 0,
	difficultyLevel: "",
	interview: {
		jobRole: "",
		techstack: [],
		interviewType: "",
		jobDescription: undefined
	},
	exam: {
		studyType: "multipleChoices",
		documents: [],
		tags: undefined,
		language: undefined
	},
	transcript: [],
	modelChatHistory: [],
	status: "Not completed",
	createdAt: "",
	updatedAt: ""
};

const defaultPrepFeedback: prepFeedbackInterface = {
	_id: "",
	userId: "",
	prepId: "",
	prepType: "Exam",
	prepTitle: "",
	numberOfQuestions: 0,
	difficultyLevel: "",
	totalScore: 0,
	percentageScore: 0,
	totalQuestions: 0,
	answeredQuestions: 0,
	questionReviews: [],
	feedbackSummary: "",
	strengths: [],
	areasForImprovement: [],
	finalAssessment: "",
	createdAt: "",
	updatedAt: ""
}

type _typeInterface_ = {
	allPreps: prepInterface[];
	prepData: prepInterface;
	prepFeedback: prepFeedbackInterface;

	_setPrepData: (data: prepInterface) => void;
	_setAllPreps: (data: prepInterface[]) => void;
	_setPrepFeedback: (data: prepFeedbackInterface) => void;
};

export const usePrepStore = create<_typeInterface_>((set) => ({
	allPreps: [],
	prepData: defaultPrepData,
	prepFeedback: defaultPrepFeedback,

	_setAllPreps: (data) => {

		set((state) => {
			return {
				allPreps: data,
			};
		});
	},

	_setPrepData: (data) => {

		set((state) => {
			return {
				prepData: data,
			};
		});
	},

	_setPrepFeedback: (data) => {

		set((state) => {
			return {
				prepFeedback: data,
			};
		});
	},
	
}));
