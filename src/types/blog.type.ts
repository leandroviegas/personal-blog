export type Topic = {
    _id?: string;
    name: string;
    link: string;
    description: string;
    image: string;
}

export type Roles = "admin" | "author" | "user";

export type User = {
    link: string;
    username: string;
    profilePicture: string;
    role: Roles | string;
}

export type Post = {
    _id?: string;
    title: string;
    content: string;
    image?: string;
    link: string;
    readTime: number;
    active: boolean;
    keywords: string;
    description: string;
    modifiedAt: Date;
    postedAt: Date;
    topics: Topic[] | string[];
    author: User | string;
}