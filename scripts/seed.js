import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create multiple tags
    const tagNames = ['Technology', 'Health', 'Education', 'Science', 'Travel'];
    const createdTags = await prisma.tag.createMany({
        data: tagNames.map(name => ({ name })),
    });

    // Fetch all tags after creation
    const allTags = await prisma.tag.findMany();

    // Create multiple articles
    const articles = [];

    for (let i = 1; i <= 10; i++) {
        const articleTags = allTags
        .sort(() => 0.5 - Math.random()) // Shuffle tags array
        .slice(0, Math.floor(Math.random() * allTags.length) + 1); // Take a random number of tags

        const article = await prisma.article.create({
            data: {
                title: `Article Title ${i}`,
                content: `This is the content for article ${i}.`,
                slug: `article-title-${i}`,
                createdAt: new Date(),
                tags: {
                    create: articleTags.map(tag => ({
                        tag: {
                        connect: { id: tag.id }
                        }
                    }))
                }
            }
        });

        // Create multiple comments for each article
        for (let j = 1; j <= 5; j++) {
            await prisma.comment.create({
                data: {
                    content: `This is comment ${j} for article ${i}.`,
                    articleId: article.id,
                    userId: `user${j}`,
                    createdAt: new Date(),
                },
            });
        }
    }

    console.log('Seeding completed.');
}

main()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
