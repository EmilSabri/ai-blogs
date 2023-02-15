import { c as create_ssr_component, d as each, e as escape } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".admin.svelte-ip4v1a{background-color:#eee}.articles.svelte-ip4v1a{background-color:#fff;display:flex;flex-direction:row}.list.svelte-ip4v1a{width:50%;background-color:#fff;display:flex;flex-direction:column}.title.svelte-ip4v1a{align-items:center;justify-content:center;justify-items:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `Admin Page
<div class="${"admin svelte-ip4v1a"}" data-sveltekit-preload-data="${"tap"}"><div class="${"articles svelte-ip4v1a"}"><div class="${"list svelte-ip4v1a"}"><h1 class="${"title svelte-ip4v1a"}">Private</h1>
			${each(data.privateArticles, (article) => {
    return `<a href="${"/admin/upload/private/" + escape(article, true)}">${escape(article)}</a>`;
  })}</div>

		<div class="${"list svelte-ip4v1a"}"><h1 class="${"title svelte-ip4v1a"}">Public</h1>
			${each(data.publicArticles, (article) => {
    return `<a href="${"/admin/upload/public/" + escape(article, true)}">${escape(article)}</a>`;
  })}</div></div>
</div>`;
});
export {
  Page as default
};
