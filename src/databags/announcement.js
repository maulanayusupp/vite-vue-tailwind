export const ANNOUNCEMENT_DEFAULT = {
	id: null,
	title: null,
	event_id: null,
	content: null,
	type: null,
	file_path: null,
	timezone: 'Asia/Jakarta',
	end_date: null,
	start_date: null,
	is_published: false,
};

export const TYPE_ANNOUNCEMENTS = [
	{ id: 'all', name: 'All' },
	{ id: 'announcement', name: 'Announcement' },
	{ id: 'maintenance', name: 'Maintenance' },
];