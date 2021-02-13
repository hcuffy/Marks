import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {NavBarButton} from './formHelpers';
import css from './style.css';

function NavbarComponent({t, tabChangeData, actions}) {
    return (
        <div className={css.navbar_div}>
            <h4 className={css.center_main_header}>{t('room.title')}</h4>

            <NavBarButton t={t} navBarData={tabChangeData} actions={actions}/>

        </div>
    );
}

const mapStateToProps = state => ({tabChangeData: state.tabChangeData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NavbarComponent));
