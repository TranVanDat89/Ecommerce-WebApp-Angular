export class ArticleDTO {
    title: string;
    content: string;
    imageFile: File;
    category: string;
    constructor(articleDTO: any) {
        this.title = articleDTO.title;
        this.content = articleDTO.content;
        this.imageFile = articleDTO.imageFile;
        this.category = articleDTO.category;
    }
}