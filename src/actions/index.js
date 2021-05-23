import * as classroom from '../components/classroom/actions';
import * as subject from '../components/subject/actions';
import * as exam from '../components/exam/actions';
import * as student from '../components/students/actions';
import * as grade from '../components/grades/actions';
import * as sidemenu from '../components/sidemenu/actions';
import * as graph from '../components/graphs/actions';
import * as notes from '../components/notes/actions';
import * as settings from '../components/settings/actions';
import * as capability from '../components/capability/actions';
import * as calendar from '../components/calendar/actions';

export * from '../components/classroom/actions';
export * from '../components/subject/actions';
export * from '../components/exam/actions';
export * from '../components/students/actions';
export * from '../components/grades/actions';
export * from '../components/sidemenu/actions';
export * from '../components/graphs/actions';
export * from '../components/notes/actions';
export * from '../components/settings/actions';
export * from '../components/capability/actions';
export * from '../components/calendar/actions';

export const actionCreators = {
    ...classroom,
    ...subject,
    ...exam,
    ...student,
    ...grade,
    ...sidemenu,
    ...graph,
    ...settings,
    ...notes,
    ...capability,
    ...calendar
};
