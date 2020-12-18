import i18next from 'i18next';
import _ from 'lodash';
import {ENGLISH_LABELS, GERMAN_LABELS} from '../constants/menuLabels';

export const customTranslate = translate => i18next.t(translate);

export const resolveLabel = (current, translated) => (_.isEmpty(current) ? translated : current);

export const currentLanguage = () => i18next.language;

export const customMenuTranslation = (locale, label) => {
    const primaryLang = locale.slice(0, 2);
    if (primaryLang === 'de') {
        return GERMAN_LABELS[label];
    }

    return ENGLISH_LABELS[label];
};
