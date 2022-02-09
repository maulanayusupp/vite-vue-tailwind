import {
	CalendarIcon,
	ChartBarIcon,
	HomeIcon,
	UsersIcon,
	CogIcon,
	UserGroupIcon,
	TemplateIcon,
	CollectionIcon,
	ColorSwatchIcon,
	ChatAltIcon,
	ClockIcon,
	SpeakerphoneIcon,
	UserIcon,
} from '@heroicons/vue/outline';

import {
	CollectionIcon as CollectionIconSolid,
} from '@heroicons/vue/solid';

export default [
	{ 
		name: 'Dashboard', href: '/', icon: HomeIcon,
		description: '',
		childrens: [],
	},
	{
		name: 'Events', href: '/events', icon: CalendarIcon,
		description: '',
		childrens: [],
	},
	{
		name: 'Groups', href: '/groups', icon: CollectionIconSolid,
		description: '',
		childrens: [],
	},
	{
		name: 'Contacts', href: '/contacts', icon: UserIcon,
		description: '',
		childrens: [],
	},
	{
		name: 'Teams', href: '/teams', icon: UserGroupIcon,
		description: '',
		childrens: [],
	},
	{
		name: 'Templates', href: '/templates', icon: TemplateIcon,
		description: '',
		childrens: [],
	},
	// {
	// 	name: 'Settings', href: '/settings', icon: CogIcon,
	// 	description: '',
	// 	childrens: [],
	// },
	{
		name: 'Manage', href: '', icon: CollectionIcon,
		description: 'Manage',
		childrens: [
			{
				name: 'Categories', href: '/categories', icon: CollectionIcon,
				description: 'Manage and organize the data.',
			},
			{
				name: 'Tags', href: '/tags', icon: ColorSwatchIcon,
				description: "Manage and classify the tags for any data.",
			},
			{
				name: 'Announcements', href: '/announcements', icon: SpeakerphoneIcon,
				description: "Let's inform the user's everything what happened.",
			},
			{
				name: 'Changelogs', href: '/changelogs', icon: ClockIcon,
				description: "Organize our updates and let's user keep up to date.",
			},
			{
				name: 'Feedbacks', href: '/feedbacks', icon: ChatAltIcon,
				description: "Manage feedbacks from user's and let's build.",
			},
			{
				name: 'Reports', href: '/reports', icon: ChartBarIcon,
				description: 'A result of research and analysis of data and of issues.',
			},
			{
				name: 'Users', href: '/users', icon: UsersIcon,
				description: "Manage all user's in the system.",
			},
		]
	},
]