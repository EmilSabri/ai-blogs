import { c as create_ssr_component } from "../../../../chunks/index2.js";
import "../../../../chunks/SiteLinks.js";
/* empty css                                                         */const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".articles-container.svelte-1cc5in8{max-width:600px;margin:0 auto}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"articles-container svelte-1cc5in8"}">
	
	${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
