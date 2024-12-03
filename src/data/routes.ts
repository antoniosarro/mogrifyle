export interface Route {
	title: string;
	path: string;
	show: boolean;
	description: string;
	image: string;
	url: string;
	twitter: {
		image: string;
		imageAlt: string;
		site: string;
		creator: string;
		handle: string;
	};
}

export const routes: Route[] = [
	{
		title: 'Home',
		path: '/',
		show: false,
		description: 'Passionate Geek Guy, Software Developer and Writer',
		image: '',
		url: 'https://antoniosarro.dev/',
		twitter: {
			image: '',
			imageAlt: 'Antonio Sarro',
			site: '@_antoniosarro_',
			creator: '@_antoniosarro_',
			handle: '@_antoniosarro_'
		}
	},
	{
		title: 'About',
		path: '/about',
		show: true,
		description: 'Do you want to know more about me? This is the right place',
		image: '',
		url: 'https://antoniosarro.dev/about',
		twitter: {
			image: '',
			imageAlt: 'About',
			site: '@_antoniosarro_',
			creator: '@_antoniosarro_',
			handle: '@_antoniosarro_'
		}
	},
	{
		title: 'Privacy',
		path: '/privacy',
		show: true,
		description:
			'Learn about the projects I worked on, with an in-depth look at the technologies used',
		image: '',
		url: 'https://antoniosarro.dev/projects',
		twitter: {
			image: '',
			imageAlt: 'Projects',
			site: '@_antoniosarro_',
			creator: '@_antoniosarro_',
			handle: '@_antoniosarro_'
		}
	}
];
