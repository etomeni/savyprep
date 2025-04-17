export type testimonialInterface = {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar?: string; // You could use require('./path/to/image.png')
}


export interface prepDiscussInterface {
    _id: string;
	userId: string;
	userEmail: string;

	prepId: string,
	prepFeedbackId: string,

	role: "user" | "model" | "assistant" | "system",
	text: string
	
	createdAt: string;
	updatedAt: string;
}
