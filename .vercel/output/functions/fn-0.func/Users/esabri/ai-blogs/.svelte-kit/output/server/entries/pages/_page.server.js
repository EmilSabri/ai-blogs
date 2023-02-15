import { a as articles } from "../../chunks/articles.js";
async function load() {
  let articlesMeta = await articles.getPublicArticles(true, 10);
  articlesMeta = articlesMeta.map((article) => {
    return { ...article, contentLink: article.contentLink.toLowerCase() };
  });
  return {
    articles: articlesMeta
  };
}
export {
  load
};
