import { c as create_ssr_component, e as escape, d as each } from "../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Search results for ${escape(data.search_params)}
	${escape(data.didFind ? "" : "were not found. Showing all articles")}
	${each(data.articles, (article) => {
    return `<div><a href="${"/articles/" + escape(article.contentLink, true)}">${escape(article.title)}</a>
		</div>`;
  })}</h1>`;
});
export {
  Page as default
};
