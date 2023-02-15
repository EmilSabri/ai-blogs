import { c as create_ssr_component, b as add_attribute, e as escape, d as each, v as validate_component } from "../../chunks/index2.js";
import "../../chunks/SiteLinks.js";
/* empty css                                                   */const css$2 = {
  code: "a.svelte-2nl6vx{text-decoration:none;color:inherit}.articleCard.svelte-2nl6vx{margin-bottom:1.875em}.articleTitle.svelte-2nl6vx{font-size:1.25rem;line-height:1.3571;font-weight:700}.articleDescription.svelte-2nl6vx{font-size:0.875rem;line-height:1.7143;font-weight:400}.test-img.svelte-2nl6vx{width:100%;aspect-ratio:600 / 450;object-fit:cover;backface-visibility:hidden;max-width:100%}@screen xs{}@screen md{}@screen mdlg{}",
  map: null
};
const ArticleCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { article } = $$props;
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  $$result.css.add(css$2);
  return `<div class="${"articleCard svelte-2nl6vx"}"><a${add_attribute("href", "/articles/" + article.contentLink, 0)} class="${"svelte-2nl6vx"}"><img class="${"test-img svelte-2nl6vx"}"${add_attribute("src", article.image?.url, 0)}${add_attribute("alt", article.image.alt, 0)} loading="${"lazy"}">
		<h2 class="${"articleTitle svelte-2nl6vx"}">${escape(article.title)}</h2>
		<p class="${"articleDescription svelte-2nl6vx"}">${escape(article.description)}</p>
		</a>
</div>`;
});
const css$1 = {
  code: ".svelte-1d3kvz0{box-sizing:border-box}h3.svelte-1d3kvz0{margin:0}.homepage.svelte-1d3kvz0{font-size:1rem}.sectionTitle.svelte-1d3kvz0{margin-bottom:1.1429em;padding-bottom:0.2858em;font-size:1rem;line-height:1.7143;font-weight:700;letter-spacing:0.02em;border-bottom:1px solid}.trending__list.svelte-1d3kvz0{display:grid;grid-template-columns:1fr}@media(min-width: 680px){.content-list.svelte-1d3kvz0{display:grid;grid-template-columns:2.1fr 0.9fr;gap:0em 1em}.trending__list.svelte-1d3kvz0{grid-template-columns:1fr 1fr;gap:1em 1em}}",
  map: null
};
const Homepage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let products = ["B12 Shots", "Vitamin D", "Sauna", "Cold plunges", "Atheltic Greens"];
  products = [...products, ...products, ...products];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css$1);
  return `<div class="${"homepage svelte-1d3kvz0"}">
	
	<div class="${"content-list svelte-1d3kvz0"}">
		
		<div class="${"trending svelte-1d3kvz0"}"><h3 class="${"sectionTitle svelte-1d3kvz0"}">Trending</h3>
			<div class="${"trending__list svelte-1d3kvz0"}">${each(data.articles, (article) => {
    return `${validate_component(ArticleCard, "ArticleCard").$$render($$result, { article }, {}, {})}`;
  })}</div></div>

		
		
		
		
		</div>
</div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".home-wrapper.svelte-1yh1m5i{margin:1em}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"home-wrapper svelte-1yh1m5i"}">${validate_component(Homepage, "Homepage").$$render($$result, { data }, {}, {})}
</div>`;
});
export {
  Page as default
};
