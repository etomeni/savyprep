export type testimonialInterface = {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar?: string; // You could use require('./path/to/image.png')
}