import _ from 'lodash';

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
        formValues[value] = target[value].value;
    });

    return formValues;
}

export function getAttribute(prop, {target}) {
    return target.getAttribute(prop);
}

