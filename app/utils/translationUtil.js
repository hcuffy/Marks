import i18next from 'i18next';
import _ from 'lodash';
import {ENGLISH_LABELS, GERMAN_LABELS} from '../constants/menuLabels';

export function customTranslate(translate) {
    return i18next.t(translate);
}

export function resolveLabel(current, translated) {
    return _.isEmpty(current) ? translated : current;
}

export function currentLanguage() {
    return i18next.language;
}

export function customMenuTranslation(locale, label) {
    const primaryLang = locale.slice(0, 2);
    if (primaryLang === 'de') {
        return GERMAN_LABELS[label];
    }

    return ENGLISH_LABELS[label];
}
