import _ from 'lodash';

export function inputValidation(formValues) {
    return _.values(formValues).some(value => value === '');
}

export function addressElements({title, street, province, country, zip, city, year}) {
    return {title, street, province, country, zip, city, year};
}
