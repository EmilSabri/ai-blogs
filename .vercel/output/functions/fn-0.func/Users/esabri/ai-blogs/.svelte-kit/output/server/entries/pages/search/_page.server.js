import { a as articleRepository } from "../../../chunks/redis.js";
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
async function load({ url }) {
  const query = url.searchParams.get("q");
  console.log(query);
  let didFind = true;
  let articles = await articleRepository.search().where("title").match(query).or("description").match(query).return.all();
  if (articles.length === 0) {
    didFind = false;
    console.log("No results found, returning all articles");
    articles = await articleRepository.search().return.all();
  }
  const results = articles.map((article) => toArticle(article));
  return {
    search_params: query,
    didFind,
    articles: results
  };
}
export {
  load
};
