import i18next from 'i18next';
import _ from 'lodash';
import moment from 'moment';
import {ENGLISH_LABELS, GERMAN_LABELS} from '../constants/menuLabels';

export function customTranslate(translate) {
    return i18next.t(translate);
}

export function resolveLabel(current, translated) {
    return _.isEmpty(current) ? translated : current;
}

export function getUserLocale() {
    return i18next.language.slice(0, 2) === 'en' ? 'en' : 'de';
}

moment.locale(getUserLocale());

export function customMenuTranslation(label) {
    if (getUserLocale() === 'de') {
        return GERMAN_LABELS[label];
    }

    return ENGLISH_LABELS[label];
}
