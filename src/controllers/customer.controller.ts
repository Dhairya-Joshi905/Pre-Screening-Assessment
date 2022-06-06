import { RequestHandler, Request, Response } from "express";
import sequelize from "sequelize";

import models from "../config/model.config";

require("dotenv").config();

type displayData = {
  firstName: string;
  lastName: string;
  city: string;
  company: string;
};

const createCustomer: RequestHandler = async (req, res) => {
  try {
    req.body.firstName =
      req.body.firstName[0].toUpperCase() +
      req.body.firstName.substring(1).toLowerCase();

    req.body.lastName =
      req.body.lastName[0].toUpperCase() +
      req.body.lastName.substring(1).toLowerCase();

    const exists = await models.Customer.findOne({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });
    
    if (exists)
      return res.status(400).json({ message: "Customer already exists!" });
    else {
      const Customer = await models.Customer.create(req.body);
      if (Customer)
        return res.status(200).json({
          message: "Customer created successfully! Below is its data.",
          data: Customer,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

const getCustomerById: RequestHandler = async (req, res) => {
  try {
    const suchCustomerExists = await models.Customer.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (suchCustomerExists) return res.status(200).json({ data: suchCustomerExists });
    else
      return res
        .status(404)
        .json({ message: "No Customer with this ID found." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

const getCitiesWithNumberOfCustomers: RequestHandler = async (req, res) => {
  try {
    const gotData = await models.Customer.findAll({
      group: "city",
      attributes: [
        "city",
        [sequelize.fn("COUNT", sequelize.col("city")), "Customers"],
      ],
    });
    if (gotData)
      return res.status(200).json(gotData);
    else
      return res.status(404).json({ message: "Data not found!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

const searchByFirstNameLastNameAndCity: RequestHandler = async (req, res) => {
  const displaySearchResult: displayData[] = [];
  try {
    const allCustomers = await models.Customer.findAll();
    if (allCustomers && allCustomers.length > 0)
      for (let x in allCustomers)
        displaySearchResult.push({
          firstName: allCustomers[x].firstName,
          lastName: allCustomers[x].lastName,
          city: allCustomers[x].city,
          company: allCustomers[x].company,
        });
    let filteredData;
    
    if (req.body.firstName)
      filteredData = displaySearchResult.filter((i) => i.firstName == req.body.firstName);
    
    if (req.body.lastName) {
      if (filteredData)
        filteredData = filteredData.filter((i) => i.lastName == req.body.lastName);
      else
        filteredData = displaySearchResult.filter((i) => i.lastName == req.body.lastName);
    }
    
    if (req.body.city) {
      if (filteredData)
        filteredData = filteredData.filter((i) => i.city == req.body.city);
      else
        filteredData = displaySearchResult.filter((i) => i.city == req.body.city);
    }

    const page = Number.parseInt((req.query as any).page);
    const limit = Number.parseInt((req.query as any).limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const resultObject: any = {};
    if (startIndex > 0)
      resultObject.previous = {
        page: page - 1,
        limit: limit,
      };
    if (endIndex < filteredData.length)
      resultObject.next = {
        page: page + 1,
        limit: limit,
      };
    resultObject.results = filteredData.slice(startIndex, endIndex);
    return res.status(200).json(resultObject);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export default {
  createCustomer,
  getCustomerById,
  getCitiesWithNumberOfCustomers,
  searchByFirstNameLastNameAndCity,
};
