import { s as siteLinks } from "../../../chunks/SiteLinks.js";
import { e as error } from "../../../chunks/index.js";
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
async function load({ params }) {
  const allowedUrls = siteLinks.combined.map((link) => link.link);
  const url = params.nav_links;
  if (!allowedUrls.includes(url)) {
    throw error(404, `Not Found for ${url}`);
  }
  let articles = [];
  const navLinks = siteLinks.nav.map((link) => link.link);
  if (navLinks.includes(url)) {
    const articleResults = await articleRepository.search().where("tags").containOneOf(url).return.all();
    if (articleResults.length > 0) {
      articles = articleResults.map((article) => toArticle(article));
    }
  }
  return { url, articles };
}
export {
  load
};
