export type questionInterface = {
	_id: string;
	question: string; 
	userAnswer: string 
	aiAnswer: string; 

	options?: string[];
	reference?: string;
	explanation?: string;
};

export type prepInterface = {
	_id: string,
	userId: string;

	prepType: "Exam" | "Interview", 
	prepTitle: string,
	numberOfQuestions: number,
	difficultyLevel: string,

	interview: {
		jobRole: string, 
		techstack: string[], 
		interviewType: string,
		jobDescription?: string, 
		// cvFile?: string
	},

	exam: {
		studyType: "multipleChoices" | "flash card" | "theory" | "subjective" | "booleanObjective",
		documents: string[],
		// followUp: boolean = false,
		tags?: string[], // Focus Topics
		language?: string // "English"
	},

	transcript: questionInterface[],

	modelChatHistory: {
		// responseId: string,
        role: "user" | "model",
        parts: { text: string }[],
	}[];

	status: "Not completed" | "Pre-Saved" | "Processing" | "Completed";

	createdAt: string;
	updatedAt: string;
}


export interface prepFeedbackInterface {
	_id: string;

	userId: string;

	prepId: string,
	prepType: "Exam" | "Interview", 
	prepTitle: string,
	numberOfQuestions: number,
	difficultyLevel: string,

	totalScore: number; // Average of all category scores
	percentageScore: number; // Percentage of questions answered
	totalQuestions: number;
	answeredQuestions: number;

	questionReviews: questionInterface[],
		
	feedbackBreakdowns?: [
		{
			title: string; // e.g., "Communication Skills"
			score: number; // 0 to 100
			comment: [
				{
					feedback: string;
					isPositive: boolean;
				}
			]
		}
	];

	feedbackSummary: string;
	strengths: string[]; // Bullet points of what went well
	areasForImprovement: string[]; // Bullet points of what needs work
	finalAssessment: string; // A brief closing statement summarizing the candidate’s overall performance

	createdAt: string;
	updatedAt: string;
}