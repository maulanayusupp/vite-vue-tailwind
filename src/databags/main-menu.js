import {
	CalendarIcon,
	ChartBarIcon,
	HomeIcon,
	UsersIcon,
	CogIcon,
	UserGroupIcon,
	TemplateIcon,
} from '@heroicons/vue/outline';

export default [
	{ name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
	{ name: 'Teams', href: '/teams', icon: UserGroupIcon, current: false },
	{ name: 'Events', href: '/events', icon: CalendarIcon, current: false },
	{ name: 'Templates', href: '/templates', icon: TemplateIcon, current: false },
	{ name: 'Users', href: '/users', icon: UsersIcon, current: false },
	{ name: 'Reports', href: '/reports', icon: ChartBarIcon, current: false },
	{ name: 'Settings', href: '/settings', icon: CogIcon, current: false },
]