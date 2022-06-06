import {Joi} from 'celebrate';

const createCustomerSchema = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        city: Joi.string().required(),
        company: Joi.string().required()
    }
}
const getCustomerSchema = {
    params: {
        id: Joi.number().required()
    }
}
const SearchResults = {
    body: {
        firstName: Joi.string(),
        lastName: Joi.string(),
        city: Joi.string()
    }
}
export default {
    createCustomerSchema,
    getCustomerSchema,
    SearchResults
}