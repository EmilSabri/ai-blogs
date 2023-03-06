export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12')
];

export const server_loads = [5];

export const dictionary = {
		"/": [~6],
		"/(blog)/ToDelete": [~7,[2]],
		"/(blog)/admin": [~9],
		"/(blog)/admin/upload/[visible]/[article_slug]": [~10],
		"/(blog)/articles/[article_slug]": [~11,[,5],[4]],
		"/(blog)/search": [~12],
		"/(blog)/[nav_links]": [~8,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';