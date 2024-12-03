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
		description: 'Convert your files to web-friendly formats with ease and speed.',
		image: '',
		url: 'https://mogrifyle.antoniosarro.dev/',
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
		description: 'Learn more about Mogrifyle and how it works.',
		image: '',
		url: 'https://mogrifyle.antoniosarro.dev/about',
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
		description: 'Learn about the privacy policy of Mogrifyle.',
		image: '',
		url: 'https://mogrifyle.antoniosarro.dev/privacy',
		twitter: {
			image: '',
			imageAlt: 'Privacy',
			site: '@_antoniosarro_',
			creator: '@_antoniosarro_',
			handle: '@_antoniosarro_'
		}
	}
];
