import { c as create_ssr_component, e as escape, b as add_attribute, i as is_promise, n as noop, v as validate_component } from "../../../../../../chunks/index2.js";
const MarkdownResult_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".articleContainer.svelte-kwnfia{width:100%;max-width:600px;margin:0 auto}.title.svelte-kwnfia{margin-bottom:0.2223em;font-size:1.75rem;line-height:1.3571;font-weight:900}.subTitle.svelte-kwnfia{margin:0.65em 0 1.5em;font-size:1rem;font-weight:400;line-height:1.5;font-family:'Roboto', sans-serif;font-display:swap}.articleInfo.svelte-kwnfia{display:flex;align-items:center;justify-content:space-between;padding:0.5em 0;border-bottom:1px solid #eaf0f6;font-size:1rem;line-height:1.5;font-weight:400}.articleInfoInterior.svelte-kwnfia{padding:8px 0}.thumbnail.svelte-kwnfia{width:100%;max-width:100%;margin:0;height:auto;aspect-ratio:600 / 450}.articleContent.svelte-kwnfia{padding-top:24px}.articleContent.svelte-kwnfia p{margin-bottom:16px;font-size:16px;line-height:1.75;font-weight:400;font-family:'Roboto', sans-serif;font-style:normal}.articleContent.svelte-kwnfia h3{margin-bottom:0.5rem;font-family:'Oswald', sans-serif;font-size:1.5rem;line-height:1.2;font-weight:bolder}.articleContent.svelte-kwnfia h2{margin-bottom:0.5rem;font-family:'Oswald', sans-serif;font-size:1.8rem;line-height:1.2;font-weight:bolder}.articleContent.svelte-kwnfia img{margin-bottom:16px}@media(min-width: 600px){.articleInfo.svelte-kwnfia{padding:0.75em 0}}@media(min-width: 990px){.articleContainer.svelte-kwnfia{padding:40px 0}.title.svelte-kwnfia{margin-bottom:0.1667em;font-size:3rem;line-height:1.2084}.subTitle.svelte-kwnfia{margin-top:1em}.articleContent.svelte-kwnfia{padding-top:30px}}",
  map: null
};
const MarkdownResult = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { articleData } = $$props;
  if ($$props.articleData === void 0 && $$bindings.articleData && articleData !== void 0)
    $$bindings.articleData(articleData);
  $$result.css.add(css$1);
  return `<div class="${"articleContainer svelte-kwnfia"}"><h1 class="${"title svelte-kwnfia"}">${escape(articleData.title)}</h1>
	<h2 class="${"subTitle svelte-kwnfia"}">${escape(articleData.description)}</h2>
	<img class="${"thumbnail svelte-kwnfia"}"${add_attribute("src", articleData.image.url, 0)}${add_attribute("alt", articleData.image.alt, 0)} loading="${"lazy"}">

	
	<div class="${"articleInfo svelte-kwnfia"}"><div class="${"articleInfoInterior svelte-kwnfia"}">${escape(articleData.author)}</div>

		<div class="${"articleInfoInterior svelte-kwnfia"}">${escape(articleData.date)}</div></div>

	<div class="${"articleContent svelte-kwnfia"}">${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
const EditArticle_svelte_svelte_type_style_lang = "";
const css = {
  code: ".description.svelte-1gcn4cl{width:100%}.markdown-editor.svelte-1gcn4cl{display:flex;justify-content:space-between;box-sizing:border-box}.markdown-editor__panel.svelte-1gcn4cl{width:500px;height:400px;box-sizing:inherit}.markdown-editor__textarea.svelte-1gcn4cl{width:500px;height:100%;margin:0;padding:1em 2em}.markdown-output.svelte-1gcn4cl{width:800px;height:100%;overflow-y:scroll}.metadata-label.svelte-1gcn4cl{margin-right:4em}.uploadS3.svelte-1gcn4cl{padding:0.1em;background-color:greenyellow}.swap.svelte-1gcn4cl{margin:0.5em}",
  map: null
};
const EditArticle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { prefix } = $$props;
  let { articleData = {
    title: "Markdown Result Component",
    description: "This is a test description",
    image: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459__340.png",
      alt: "Test Image"
    },
    author: "joe bloe",
    date: new Date().toLocaleDateString(),
    tags: ["BigBootyBitches", "Ice Cold", "Buziness"],
    contentLink: "Markdown-Result-Component",
    keyword: "keyword"
  } } = $$props;
  let { markdown = "" } = $$props;
  let articleHtml;
  if ($$props.prefix === void 0 && $$bindings.prefix && prefix !== void 0)
    $$bindings.prefix(prefix);
  if ($$props.articleData === void 0 && $$bindings.articleData && articleData !== void 0)
    $$bindings.articleData(articleData);
  if ($$props.markdown === void 0 && $$bindings.markdown && markdown !== void 0)
    $$bindings.markdown(markdown);
  $$result.css.add(css);
  return `<div class="${""}"><h1>Upload/Update Article</h1>
	<div><btn class="${"uploadS3 svelte-1gcn4cl"}">Save Article</btn></div>
	<div class="${"swap svelte-1gcn4cl"}"><div>Currently ${escape(prefix)}</div>
		<btn class="${"uploadS3 svelte-1gcn4cl"}">GO ${escape(prefix === "private" ? "PUBLIC" : "PRIVATE")}</btn></div>
	<btn class="${"uploadS3 svelte-1gcn4cl"}">Move to No-Markdown </btn>
	<div>
		

		<div><label class="${"metadata-label svelte-1gcn4cl"}">Title: </label>
			<input class="${"description svelte-1gcn4cl"}" type="${"text"}"${add_attribute("value", articleData.title, 0)}></div>

		<div><label class="${"metadata-label svelte-1gcn4cl"}">Description: </label>
			<input class="${"description svelte-1gcn4cl"}" type="${"text"}"${add_attribute("value", articleData.description, 0)}></div>

		<div><label class="${"metadata-label svelte-1gcn4cl"}">Image: </label>
			<div class="${"flex flex-col"}"><input class="${"description svelte-1gcn4cl"}" type="${"text"}"${add_attribute("value", articleData.image.url, 0)}>
				<input class="${"description svelte-1gcn4cl"}" type="${"text"}"${add_attribute("value", articleData.image.alt, 0)}></div></div></div>
	<div class="${"markdown-editor svelte-1gcn4cl"}"><div>
			<div class="${"markdown-editor__panel mr-10 border-2 border-red-800 svelte-1gcn4cl"}"><textarea class="${"markdown-editor__textarea svelte-1gcn4cl"}" rows="${"3"}" placeholder="${"Enter Markdown"}">${markdown || ""}</textarea></div></div>
		
		<div class="${"markdown-output border-2 border-black svelte-1gcn4cl"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ``;
    }
    return function(value) {
      return `
				${validate_component(MarkdownResult, "MarkdownResult").$$render($$result, { articleData }, {}, {
        default: () => {
          return `<!-- HTML_TAG_START -->${value}<!-- HTML_TAG_END -->`;
        }
      })}
			`;
    }(__value);
  }(articleHtml)}</div></div>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let articleData = data.metadata;
  let markdown = data.markdown;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(EditArticle, "EditArticle").$$render(
    $$result,
    {
      prefix: data.visible,
      articleData,
      markdown
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
