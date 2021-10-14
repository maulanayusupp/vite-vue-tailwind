import {
	CalendarIcon,
	ChartBarIcon,
	HomeIcon,
	UsersIcon,
	CogIcon,
	UserGroupIcon,
} from '@heroicons/vue/outline';

export default [
	{ name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
	{ name: 'Events', href: '/events', icon: CalendarIcon, current: false },
	{ name: 'Teams', href: '/teams', icon: UserGroupIcon, current: false },
	{ name: 'Users', href: '/users', icon: UsersIcon, current: false },
	{ name: 'Reports', href: '/reports', icon: ChartBarIcon, current: false },
	{ name: 'Settings', href: '/settings', icon: CogIcon, current: false },
]