import {HOME, CLASSROOM, STUDENTS, GRADES, GRAPHS, NOTES, CAPABILITY, SETTINGS} from '../../constants/routes.js';

export const menuData = {
    home: {
        linkTo: HOME,
        dataId: 'home',
        name:   'home'
    },
    classroom: {
        linkTo: CLASSROOM,
        dataId: 'classroom',
        name:   'edit'
    },
    students: {
        linkTo: STUDENTS,
        dataId: 'students',
        name:   'people'
    },
    exams: {
        linkTo: GRADES,
        dataId: 'exams',
        name:   'properties'
    },
    graphs: {
        linkTo: GRAPHS,
        dataId: 'graphs',
        name:   'chart'
    },
    notes: {
        linkTo: NOTES,
        dataId: 'notes',
        name:   'clipboard'
    },
    capability: {
        linkTo: CAPABILITY,
        dataId: 'capability',
        name:   'chat'
    },
    school: {
        linkTo: SETTINGS,
        dataId: 'settings',
        name:   'settings'
    }
};
