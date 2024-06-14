//Types Declaration
export interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}

export interface User {
    user?: any;
    username: string;
    email: string;
    password?: string;
    token?:string
}

export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface Comment {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: Author
}

export interface TagsResponse{
    tags: string[];
}


export interface RootState {
    user: {
        user: {
            token: string | null; // Adjust according to your actual state structure
        };
    };
}

