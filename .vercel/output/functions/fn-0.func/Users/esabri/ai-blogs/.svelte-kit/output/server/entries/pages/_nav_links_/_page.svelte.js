import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/index2.js";
import { s as siteLinks } from "../../../chunks/SiteLinks.js";
/* empty css                                                      */const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Hello Im FUCK</h1>`;
});
const NavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { tag = "" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  return `<h1>NavLink tag is ${escape(tag)}</h1>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const navLinks = siteLinks.nav.map((link) => link.link);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1>Hello from ${escape(data.url)}</h1>

${navLinks.includes(data.url) ? `
	${validate_component(NavLink, "NavLink").$$render($$result, { tag: data.url, articles: data.articles }, {}, {})}` : ``}


${data.url === "about" ? `
	${validate_component(About, "About").$$render($$result, {}, {}, {})}` : ``}

${data.url === "contact" ? `
	` : ``}

${data.url === "privacy-policy" ? `
	` : ``}

${data.url === "terms-of-service" ? `
	` : ``}`;
});
export {
  Page as default
};
