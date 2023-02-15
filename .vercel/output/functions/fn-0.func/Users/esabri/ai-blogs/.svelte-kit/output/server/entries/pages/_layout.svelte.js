import { c as create_ssr_component, e as escape, b as add_attribute, d as each, v as validate_component } from "../../chunks/index2.js";
import { s as siteLinks } from "../../chunks/SiteLinks.js";
import { debounce } from "throttle-debounce";
/* empty css                                                   */const css$2 = {
  code: "@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');input.svelte-pxk94i.svelte-pxk94i{border:none}ul.svelte-pxk94i.svelte-pxk94i,li.svelte-pxk94i.svelte-pxk94i{list-style-type:none;padding:0}.header-container.svelte-pxk94i.svelte-pxk94i{font-display:swap;font-family:'Merriweather Sans', 'sans-serif';font-size:1.5rem;font-weight:600;line-height:1.5;display:flex;flex-direction:row;justify-content:space-between;border-bottom:1px solid #212121;box-shadow:0 3px 4px rgba(0, 0, 0, 0.08)}.nav-menu.svelte-pxk94i.svelte-pxk94i{display:none;position:fixed;width:100%;height:100vh;max-height:100vh;background-color:white}.displayMenu.svelte-pxk94i.svelte-pxk94i{display:block;visibility:visible !important;opacity:1;display:flex;flex-direction:column;align-items:left;padding:2em}.disableSearch.svelte-pxk94i.svelte-pxk94i{visibility:hidden}.header__web-icon.svelte-pxk94i a.svelte-pxk94i{text-decoration:none;color:black}.search-input-container.svelte-pxk94i.svelte-pxk94i{display:flex;flex-direction:row;border:2px solid #212121;border-radius:1em;padding:0.4em;width:80%}.search-input-icon.svelte-pxk94i.svelte-pxk94i{padding-left:1em}.search-input.svelte-pxk94i.svelte-pxk94i{width:100%;font-size:1rem;font-family:'Merriweather Sans', 'sans-serif';padding:0.5em}.search-input.svelte-pxk94i.svelte-pxk94i:focus{outline:none}.nav-links.svelte-pxk94i.svelte-pxk94i{display:flex;flex-direction:column;justify-content:center;align-items:left}.nav-link.svelte-pxk94i.svelte-pxk94i{padding:1em 0}.nav-link.svelte-pxk94i>a.svelte-pxk94i{text-decoration:none;color:inherit;font-size:1.5rem;font-weight:600}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { displayMenu = false } = $$props;
  let links = siteLinks.nav;
  let searchInput;
  debounce(500, (val) => {
  });
  if ($$props.displayMenu === void 0 && $$bindings.displayMenu && displayMenu !== void 0)
    $$bindings.displayMenu(displayMenu);
  $$result.css.add(css$2);
  return `<div id="${"header"}" class="${"header-container svelte-pxk94i"}">
	
	<div class="${""}"><img class="${"nav-bar-search-icon"}" src="${"/svg/menu-icon.svg"}" width="${"25px"}" alt="${"Navigation menu icon"}" loading="${"lazy"}"></div>
	

	
	<div class="${"header__web-icon svelte-pxk94i"}"><a href="${"/"}" class="${"svelte-pxk94i"}">BrianFog</a></div>

	
	
	<img class="${"search-icon " + escape(displayMenu ? "disableSearch" : "", true) + " svelte-pxk94i"}" src="${"/svg/search-icon.svg"}" width="${"25px"}" alt="${"Search www.BrianFog.com icon"}" loading="${"lazy"}"></div>


<div class="${["nav-menu svelte-pxk94i", displayMenu ? "displayMenu" : ""].join(" ").trim()}"><div><form class="${"search-input-container svelte-pxk94i"}"><img class="${"search-input-icon svelte-pxk94i"}" src="${"/svg/search-icon.svg"}" width="${"20px"}" alt="${"Search www.BrainFog.com icon"}" loading="${"lazy"}">
			<input class="${"search-input svelte-pxk94i"}" type="${"text"}" placeholder="${"Search"}"${add_attribute("this", searchInput, 0)}></form></div>
	<ul class="${"nav-links svelte-pxk94i"}">${each(links, (link) => {
    return `<li class="${"nav-link svelte-pxk94i"}"><a href="${"/" + escape(link.link, true)}" class="${"svelte-pxk94i"}">${escape(link.text)}</a>
			</li>`;
  })}</ul>

	
</div>`;
});
const css$1 = {
  code: ".svelte-1vxi6lb,.svelte-1vxi6lb::before,.svelte-1vxi6lb::after{box-sizing:border-box}li.svelte-1vxi6lb{list-style:none}a.svelte-1vxi6lb{text-decoration:none;color:#000}.footer-container.svelte-1vxi6lb{background-color:#ab3}.footer.svelte-1vxi6lb{max-width:1280px;padding:0 1em;margin:0 auto;display:flex;flex-direction:column}.footer-icon.svelte-1vxi6lb{font-size:1.3rem;font-weight:600;padding:1em 0;border-bottom:1px solid gray}.email-form.svelte-1vxi6lb{padding:1em 0;border-bottom:1px solid gray}.email-form__text.svelte-1vxi6lb{font-size:1.3rem}.email-form__wrapper.svelte-1vxi6lb{display:flex;flex-direction:row;margin-top:0.2em;border-radius:1em}.email-form__input.svelte-1vxi6lb{display:inline-block;flex:1 1 0%;font-size:1rem;padding:0.8em;border-top-left-radius:9px;border:1px solid transparent;border-width:0px}.email-form__input.svelte-1vxi6lb::placeholder{font-size:1rem}.email-form__btn.svelte-1vxi6lb{display:inline-block;padding:0.8em;color:#fff;background-color:rgb(211, 59, 82);border-top-right-radius:0.5em;border-bottom-right-radius:0.5em;border:1px solid transparent;border-width:0px;line-height:1.15}.footerCol.svelte-1vxi6lb{align-items:center;margin-top:2em;display:flex;flex-direction:row;justify-content:left;padding-bottom:1em;border-bottom:1px solid gray}.footerMenu.svelte-1vxi6lb{margin:-0.5em;padding:0;display:flex;flex-direction:column}.footerMenuItem.svelte-1vxi6lb{font-weight:600;padding:0.5em;display:flex;flex-direction:row}.footerSocials-text.svelte-1vxi6lb{font-size:1.2rem;font-weight:600;padding:0.5em 0}.footerSocials.svelte-1vxi6lb{margin:0 -0.75em;padding:0;display:flex;flex-direction:row}.footerSocialsItem.svelte-1vxi6lb{padding:0 0.75em}.footerPP.svelte-1vxi6lb{font-size:0.8rem;margin-bottom:2em;display:flex;flex-direction:row}.footerPP__item.svelte-1vxi6lb{border-right:1px solid gray;padding:0 0.5em}.footerPP__item.svelte-1vxi6lb:last-child{border-right:none}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const socialLinks = [
    {
      link: "https://www.facebook.com",
      icon: "/facebook.svg",
      name: "Facebook"
    },
    {
      link: "https://www.instagram.com",
      icon: "/instagram.svg",
      name: "Instagram"
    },
    {
      link: "https://www.twitter.com",
      icon: "/twitter.svg",
      name: "Twitter"
    },
    // { link: 'https://www.pinterest.com', icon: '/pinterest.svg', name: 'Pinterest' },
    // { link: 'https://www.youtube.com', icon: '/youtube.svg', name: 'YouTube' },
    // { link: 'https://www.linkedin.com', icon: '/linkedin.svg', name: 'LinkedIn' },
    {
      link: "https://www.tiktok.com",
      icon: "/tiktok.svg",
      name: "TikTok"
    }
  ];
  $$result.css.add(css$1);
  return `<div class="${"footer-container svelte-1vxi6lb"}"><div class="${"footer svelte-1vxi6lb"}">
		<div class="${"footer-icon svelte-1vxi6lb"}">BrianFog</div>

		
		
		<div class="${"email-form svelte-1vxi6lb"}"><div class="${"email-form__text svelte-1vxi6lb"}">Join 1,000 other mind conscious people getting the latest updates
			</div>
			<div class="${"email-form__wrapper svelte-1vxi6lb"}"><input class="${"email-form__input svelte-1vxi6lb"}" type="${"text"}" placeholder="${"Your email address"}">
				<div class="${"email-form__btn svelte-1vxi6lb"}">SIGN UP</div></div></div>

		
		<div class="${"footerCol svelte-1vxi6lb"}"><ul class="${"footerMenu svelte-1vxi6lb"}">${each(siteLinks.nav, (link) => {
    return `<li class="${"footerMenuItem svelte-1vxi6lb"}"><a${add_attribute("href", "/" + link.link, 0)} class="${"svelte-1vxi6lb"}">${escape(link.text)}</a>
					</li>`;
  })}</ul></div>

		
		<div class="${"footerCol svelte-1vxi6lb"}"><div class="${"svelte-1vxi6lb"}"><div class="${"footerSocials-text svelte-1vxi6lb"}">Follow Us</div>
				<ul class="${"footerSocials svelte-1vxi6lb"}">${each(socialLinks, (socialLink) => {
    return `<li class="${"footerSocialsItem svelte-1vxi6lb"}"><a${add_attribute("href", socialLink.link, 0)} class="${"svelte-1vxi6lb"}"><img src="${"/svg/" + escape(socialLink.icon, true)}" width="${"22"}" alt="${"Instagram Logo"}" loading="${"lazy"}" class="${"svelte-1vxi6lb"}"></a>
						</li>`;
  })}</ul></div></div>

		
		<div class="${"footerCol svelte-1vxi6lb"}"><div class="${"footerPP svelte-1vxi6lb"}">${each(siteLinks.footer, (links) => {
    return `<a class="${"footerPP__item svelte-1vxi6lb"}"${add_attribute("href", links.link, 0)}>${escape(links.text)}</a>`;
  })}</div></div></div>
</div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');@import url('https://fonts.googleapis.com/css?family=Merriweather');.svelte-1db8mki,.svelte-1db8mki::before,.svelte-1db8mki::after{box-sizing:border-box}.body-container.svelte-1db8mki{font-family:'Merriweather Sans', 'sans-serif';font-display:swap;font-size:1rem;font-weight:400;line-height:1.5;height:100vh}.disableScroll.svelte-1db8mki{overflow:hidden}.slot-container.svelte-1db8mki{font-family:'Merriweather Sans', 'sans-serif';font-size:1rem;font-weight:400;line-height:1.5;max-width:1250px;margin:0 auto}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disableScroll = false;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1gi89al_START --><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1.0"}" class="${"svelte-1db8mki"}">${$$result.title = `<title>BrianFog</title>`, ""}<meta name="${"description"}" content="${"Home page of BrianFog.com"}" class="${"svelte-1db8mki"}"><!-- HEAD_svelte-1gi89al_END -->`, ""}

<div class="${["body-container svelte-1db8mki", disableScroll ? "disableScroll" : ""].join(" ").trim()}"><div id="${"slot-thot"}" class="${"slot-container svelte-1db8mki"}">${validate_component(Header, "Header").$$render(
      $$result,
      { displayMenu: disableScroll },
      {
        displayMenu: ($$value) => {
          disableScroll = $$value;
          $$settled = false;
        }
      },
      {}
    )}
		${slots.default ? slots.default({}) : ``}</div>
	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
