import i18next from 'i18next';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/de';

export function getUserLocale() {
    let locale = i18next.language?.slice(0, 2);

    if (_.isUndefined(locale)) {
        return 'de';
    }

    return locale === 'en' ? 'en' : 'de';
}

moment.locale(getUserLocale());

export function customTranslate(translate) {
    return i18next.t(translate);
}

export function resolveLabel(current, translated) {
    return _.isUndefined(current) || _.isEmpty(current) ? translated : current;
}
