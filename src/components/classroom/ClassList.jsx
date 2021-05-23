import React from 'react';

import RoomDialog from './RoomDialog';
import {ClassroomList} from './formHelpers';
import css from './style.css';

export function ClassList({t}) {
    return (
        <div className={css.list_div}>
            <RoomDialog t={t} />
            <ClassroomList/>
        </div>
    );
}
