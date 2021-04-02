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

export function getSelectedOption(event, propToGet) {
    const index = event.target[propToGet]?.selectedIndex;

    return event.target[propToGet]?.options[index]?.getAttribute('data-id');
}
