import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {changeClassroomTab} from './actions';
import {NavBarButton} from './formHelpers';
import css from './style.css';

function NavbarComponent({t, tabChangeData, changeClassroomTab}) {
    return (
        <div className={css.navbar_div}>
            <h4 className={css.center_main_header}>{t('room.title')}</h4>

            <NavBarButton t={t} navBarData={tabChangeData} changeClassroomTab={changeClassroomTab}/>

        </div>
    );
}

const mapStateToProps = state => ({tabChangeData: state.tabChangeData});

const mapDispatchToProps = {changeClassroomTab};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NavbarComponent));
