import { c as create_ssr_component, e as escape, b as add_attribute, i as is_promise, n as noop } from "../../../../chunks/index2.js";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-aepwgn.svelte-aepwgn,.svelte-aepwgn.svelte-aepwgn::before,.svelte-aepwgn.svelte-aepwgn::after{box-sizing:border-box}a.svelte-aepwgn.svelte-aepwgn{outline:none;text-decoration:underline}h1.svelte-aepwgn.svelte-aepwgn{font-family:Arial, Helvetica, sans-serif;font-size:2.125rem;font-weight:600;line-height:1.1;margin:0px;padding:0px;color:#212121}img.svelte-aepwgn.svelte-aepwgn{aspect-ratio:600 / 450;max-width:100%;margin:0px;padding:0px}p.svelte-aepwgn.svelte-aepwgn{font-family:'Merriweather', 'serif';font-size:1rem;font-weight:400;line-height:1.5625;margin:1em 0px;padding:0px;color:#212121}.article-meta.svelte-aepwgn.svelte-aepwgn{font-size:0.875rem;font-weight:600;line-height:1;margin:0px;margin-bottom:2em;padding:1em 0;display:flex;flex-direction:row;justify-content:space-between;color:#646464}.I-seperator.svelte-aepwgn.svelte-aepwgn{color:#646464}.article-meta.svelte-aepwgn a.svelte-aepwgn{color:inherit}.description.svelte-aepwgn.svelte-aepwgn{margin-top:0.6em;margin-bottom:1em}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let markdown = data.markdown;
  let articleData = data.metadata;
  let articleHtml = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkRehype).use(rehypeStringify).process(markdown);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `


${$$result.head += `<!-- HEAD_svelte-1e9nrjt_START -->${$$result.title = `<title>${escape(articleData.title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", articleData.description, 0)} class="${"svelte-aepwgn"}"><!-- HEAD_svelte-1e9nrjt_END -->`, ""}

<div class="${"article-container svelte-aepwgn"}"><div class="${"article-titles svelte-aepwgn"}"><h1 class="${"svelte-aepwgn"}">${escape(articleData.title)}</h1>
		<p class="${"description svelte-aepwgn"}">${escape(articleData.description)}</p>
		<img${add_attribute("src", articleData.image.url, 0)}${add_attribute("alt", articleData.image.alt, 0)} loading="${"lazy"}" class="${"svelte-aepwgn"}">
		<div class="${"article-meta svelte-aepwgn"}"><a href="${"/author/" + escape(articleData.author, true)}" class="${"svelte-aepwgn"}">${escape(articleData.author)}</a>
			<span class="${"I-seperator svelte-aepwgn"}">|</span>
			<div class="${"svelte-aepwgn"}">Updated on ${escape(articleData.date)}</div></div></div>

	
	${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(value) {
      return `
		<div class="${"articleContent svelte-aepwgn"}"><!-- HTML_TAG_START -->${value}<!-- HTML_TAG_END --></div>
	`;
    }(__value);
  }(articleHtml)}
</div>`;
});
export {
  Page as default
};
