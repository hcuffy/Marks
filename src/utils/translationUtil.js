import i18next from 'i18next';
import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import {ENGLISH_LABELS, GERMAN_LABELS} from '../constants/menuLabels';

export function getUserLocale() {
    let locale = i18next.language?.slice(0, 2);

    if (_.isUndefined(locale)) {
        return 'de';
    }

    return locale === 'en' ? 'en' : 'de';
}

dayjs.extend(localizedFormat);
dayjs.locale(getUserLocale());

export function customTranslate(translate) {
    return i18next.t(translate);
}

export function resolveLabel(current, translated) {
    return _.isEmpty(current) ? translated : current;
}

export function customMenuTranslation(locale, label) {
    if (locale === 'de') {
        return GERMAN_LABELS[label];
    }

    return ENGLISH_LABELS[label];
}
