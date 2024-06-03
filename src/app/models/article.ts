export interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    category: {
        id: string;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
}