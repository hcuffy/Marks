import _ from 'lodash';
import {displayToast} from '../../notifications';

export function inputValidation(formValues) {
    return _.values(formValues).some(value => value === '');
}

export function filteredAddressData(data) {
    const {
        title = '',
        street = '',
        province = '',
        country = '',
        zip = '',
        city = '',
        year = ''
    } = data;

    return {title, street, province, country, zip, city, year};
}

export function getFormValues(propObject, {target}) {
    const formValues = {};

    _.forEach(propObject, value => {
        formValues[value] = target[value]?.value;
    });

    return formValues;
}

export function getAttribute(prop, event) {
    let value = event.target?.getAttribute(prop);

    if (value === null) {
        return event.currentTarget?.getAttribute(prop);
    }

    return value;
}

export function getCustomAttribute(prop, entry, event) {
    return event.target[entry]?.getAttribute(prop);
}

export function getTargetValue({target}) {
    return target?.value;
}

//TODO: Remove this function once all dropdowns have been replaced
export function notifyIfEmpty(list, isSelected, section) {
    if (_.isEmpty(list) && isSelected) {
        displayToast(section, 'warn');
    }
}

//TODO Remove this function once all dropdowns have been replaced
export function sortByName(data) {
    return _.sortBy(data, ['name'], ['asc']);
}
//TODO : Remove this function once all dropdown have been replaced
export function getClassroomProp(prop, classdata) {
    const classObject = _.find(classdata, {prop}) || {};
    if (_.isUndefined(classObject)) {
        return '';
    }

    return classObject.prop;
}

export function getSelectedOption(event, propToGet) {
    const index = event.target[propToGet]?.selectedIndex;

    return event.target[propToGet]?.options[index]?.getAttribute('data-id');
}
