import { a as articles } from "../../../../chunks/articles.js";
import { a as articleRepository, m as markdownRepository } from "../../../../chunks/redis.js";
const toArticle = (article) => {
  return {
    title: article.title,
    description: article.description,
    date: article.date,
    image: {
      url: article.imageUrl,
      alt: article.imageAlt
    },
    tags: article.tags,
    contentLink: article.contentLink,
    keyword: article.keyword
  };
};
const toMarkdown = (markdown) => {
  return markdown.markdown;
};
async function load({ params }) {
  const key = `${params.article_slug.toLowerCase()}`;
  let articleResults = await articleRepository.search().where("contentLink").equals(key).return.all();
  let markdownResults = await markdownRepository.search().where("contentLink").equals(key).return.all();
  let markdown = "";
  let metaJson = {};
  if (articleResults.length > 0 && markdownResults.length > 0) {
    markdown = toMarkdown(markdownResults[0]);
    metaJson = toArticle(articleResults[0]);
  }
  if (articleResults.length === 0 || markdownResults.length === 0) {
    const prefix = "public";
    markdown = await articles.getArticle(prefix, `${key}/markdown.md`);
    const metadata = await articles.getArticle(prefix, `${key}/metadata.json`);
    metaJson = JSON.parse(metadata);
    articleRepository.createAndSave({
      title: metaJson.title,
      description: metaJson.description,
      date: metaJson.date,
      author: metaJson.author,
      imageUrl: metaJson.image.url,
      imageAlt: metaJson.image.alt,
      tags: metaJson.tags,
      contentLink: metaJson.contentLink.toLowerCase(),
      keyword: metaJson.keyword
    });
    markdownRepository.createAndSave({
      contentLink: metaJson.contentLink.toLowerCase(),
      markdown
    });
  }
  return {
    markdown,
    metadata: metaJson
  };
}
export {
  load
};
