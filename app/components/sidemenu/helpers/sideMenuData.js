import {
	HOME,
	CLASSROOM,
	STUDENTS,
	GRADES,
	GRAPHS,
	NOTES,
	SETTINGS
} from '../../../constants/routes.json'

export const menuData = {
	home: {
		linkTo: HOME,
		dataId: 'home',
		className: 'fa fa-home fa-3x'
	},
	classroom: {
		linkTo: CLASSROOM,
		dataId: 'classroom',
		className: 'fa fa-eraser fa-3x'
	},
	students: {
		linkTo: STUDENTS,
		dataId: 'students',
		className: 'fa fa-users fa-3x'
	},
	exams: { linkTo: GRADES, dataId: 'exams', className: 'fa fa-list-ol fa-3x' },
	graphs: {
		linkTo: GRAPHS,
		dataId: 'graphs',
		className: 'fa fa-chart-pie fa-3x'
	},
	notes: {
		linkTo: NOTES,
		dataId: 'notes',
		className: 'fas fa-sticky-note fa-3x'
	},
	school: {
		linkTo: SETTINGS,
		dataId: 'settings',
		className: 'fa fa-cog fa-3x'
	}
}
