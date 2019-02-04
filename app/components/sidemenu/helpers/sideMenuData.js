import {
	HOME,
	SCHOOL,
	CLASSROOM,
	STUDENTS,
	GRADES,
	GRAPHS
} from '../../../constants/routes.json'

export const MENUDATA = {
	home: {
		linkTo: HOME,
		dataId: 'home',
		className: 'fa fa-home fa-3x'
	},
	school: {
		linkTo: SCHOOL,
		dataId: 'school',
		className: 'fa fa-school fa-3x'
	},

	classroom: {
		linkTo: CLASSROOM,
		dataId: 'classroom',
		className: 'fa fa-eraser fa-3x'
	},

	students: { linkTo: STUDENTS, dataId: 'students', className: 'fa fa-users fa-3x' },
	exams: { linkTo: GRADES, dataId: 'exams', className: 'fa fa-list-ol fa-3x' },
	graphs: { linkTo: GRAPHS, dataId: 'graphs', className: 'fa fa-chart-pie fa-3x' }
}
