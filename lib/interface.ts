interface Article {
    id: string;
    slug: string;
    title: string;
    content: string;
    createdAt: Date;
    comments: Comment[];
    tags: TagArticle[];
}

interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    userId: string;
    articleId: string;
    article: Article;
}

interface TagArticle {
    id: string;
    articleId: string;
    article: Article;
    tagId: string;
    tag: Tag;
}

interface Tag {
    id: string;
    name: string;
    tags: TagArticle[];
}