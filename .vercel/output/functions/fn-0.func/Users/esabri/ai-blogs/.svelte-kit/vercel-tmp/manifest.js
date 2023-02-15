export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","svg/facebook.svg","svg/instagram.svg","svg/menu-icon.svg","svg/search-icon.svg","svg/search2-icon.svg","svg/tiktok.svg","svg/twitter.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-d2c14799.js","imports":["_app/immutable/start-d2c14799.js","_app/immutable/chunks/index-cf94e352.js","_app/immutable/chunks/singletons-fae73038.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/upload/[visible]/[article_slug]",
				pattern: /^\/admin\/upload\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"visible","optional":false,"rest":false,"chained":false},{"name":"article_slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/api/articles",
				pattern: /^\/api\/articles\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/articles/_server.js')
			},
			{
				id: "/api/article",
				pattern: /^\/api\/article\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/article/_server.js')
			},
			{
				id: "/api/keywords",
				pattern: /^\/api\/keywords\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/keywords/_server.js')
			},
			{
				id: "/api/openai",
				pattern: /^\/api\/openai\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/openai/_server.js')
			},
			{
				id: "/api/test",
				pattern: /^\/api\/test\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/test/_server.js')
			},
			{
				id: "/articles/[article_slug]",
				pattern: /^\/articles\/([^/]+?)\/?$/,
				params: [{"name":"article_slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,4], errors: [1,3,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/sitemap.xml/_server.js')
			},
			{
				id: "/[nav_links]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"nav_links","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
