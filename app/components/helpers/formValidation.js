import _ from 'lodash';

export const inputValidation = formValues => {
    return _.values(formValues).some(value => value === '');
};

export const addressElements = ({
    title,
    street,
    province,
    country,
    zip,
    city,
    year
}) => {
    return {
        title,
        street,
        province,
        country,
        zip,
        city,
        year
    };
};
