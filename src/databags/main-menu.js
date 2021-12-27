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
} from '@heroicons/vue/outline';

export default [
	{ name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
	{ name: 'Events', href: '/events', icon: CalendarIcon, current: false },
	{ name: 'Teams', href: '/teams', icon: UserGroupIcon, current: false },
	{ name: 'Categories', href: '/categories', icon: CollectionIcon, current: false },
	{ name: 'Tags', href: '/tags', icon: ColorSwatchIcon, current: false },
	{ name: 'Templates', href: '/templates', icon: TemplateIcon, current: false },
	{ name: 'Announcements', href: '/announcements', icon: SpeakerphoneIcon, current: false },
	{ name: 'Changelogs', href: '/changelogs', icon: ClockIcon, current: false },
	{ name: 'Feedbacks', href: '/feedbacks', icon: ChatAltIcon, current: false },
	{ name: 'Reports', href: '/reports', icon: ChartBarIcon, current: false },
	{ name: 'Users', href: '/users', icon: UsersIcon, current: false },
	{ name: 'Settings', href: '/settings', icon: CogIcon, current: false },
]