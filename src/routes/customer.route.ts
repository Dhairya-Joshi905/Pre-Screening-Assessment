import express from "express"; 
import { celebrate } from 'celebrate';

import customerSchema from "../validations/customer.validation";
import customerController from "../controllers/customer.controller";

const router: express.Router = express.Router();

const {
    createCustomerSchema,
    getCustomerSchema,
    SearchResults
} = customerSchema

//Create Customer Route
router.post('/createCustomer', celebrate(createCustomerSchema), customerController.createCustomer);

//Get Customer By ID
router.get('/getCustomerById/:id', celebrate(getCustomerSchema), customerController.getCustomerById);

//Get Unique Cities with Customer Count
router.get('/getCitiesWithNumberOfCustomers', customerController.getCitiesWithNumberOfCustomers);

//Search By Fields
router.post('/searchByFirstNameLastNameAndCity', celebrate(SearchResults), customerController.searchByFirstNameLastNameAndCity);

export = router;