export class ArticleDTO {
    title: string;
    content: string;
    imageFile: File;
    articleCategoryId: string;
    constructor(articleDTO: any) {
        this.title = articleDTO.title;
        this.content = articleDTO.content;
        this.imageFile = articleDTO.imageFile;
        this.articleCategoryId = articleDTO.articleCategoryId;
    }
}