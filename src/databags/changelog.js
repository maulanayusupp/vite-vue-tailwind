export const CHANGELOG_DEFAULT = {
	id: null,
	title: null,
	content: null,
	type: null,
	is_published: false,
	start_date: null,
	end_date: null,
};

export const TYPE_CHANGELOGS = [
	{ id: 'all', name: 'All' },
	{ id: 'in_progress', name: 'In progress' },
	{ id: 'upcoming', name: 'Upcoming' },
	{ id: 'completed', name: 'Completed' },
];