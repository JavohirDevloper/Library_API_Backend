const express = require("express");
const { NotBeforeError } = require("jsonwebtoken");
const Publisher = require("../../mongomodels/Publisher");
const { BadRequestError, NotFoundError } = require("../../shared/errors");
const httpValidator = require("../../shared/http-validator");
const {
  createPublisherSchema,
  getPublisherByIdSchema,
  updatePublisherSchema,
  removePublisherSchema,
} = require("./_schemas.js");
const addPublish = require("./add-publisher");
const {editPublisher} = require("./edit-publisher");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.createPublisher = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, createPublisherSchema);
    const { name } = req.body;
    const existingPublisher = await Publisher.findOne({ name });

    if (existingPublisher) {
      throw new BadRequestError("This publisher name is already registered");
    }
    const result = await addPublish(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.getPublishers = async (req, res, next) => {
  try {
    const { q, sort, filters, page = 1, limit = 10 } = req.query;

    const query = {};

    if (q) {
      query.name = { $regex: q, $options: "i" };
    }

    let sortObject = {};
    if (sort) {
      const [by, order] = sort.split(":");
      sortObject[by] = order === "desc" ? -1 : 1;
    } else {
      sortObject = { created_at: -1 };
    }

    if (filters && filters.is_deleted) {
      query.is_deleted = filters.is_deleted;
    } else {
      query.is_deleted = false;
    }

    const count = await Publisher.countDocuments(query);
    const publishers = await Publisher.find(query)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      count,
      data: publishers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.getPublisherById = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, getPublisherByIdSchema);

    const { id } = req.params;

    const publisher = await Publisher.findById(id);
    if (!publisher) {
      throw new NotBeforeError("Publisher not found");
    }

    res.status(200).json(publisher);
  } catch (error) {
    next(error);
  }
};

exports.updatePublisher = async (req, res, next) => {
  try {
    httpValidator(
      { body: req.body, params: req.params },
      updatePublisherSchema
    );

    const { id } = req.params;
    const result = await editPublisher(id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.removePublisher = async (req, res, next) => {
  httpValidator({ params: req.params }, removePublisherSchema);

  try {
    const { id } = req.params;

    const publisher = await Publisher.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    if (!publisher) {
      throw new NotFoundError("Publisher not found");
    }

    res
      .status(200)
      .json({ message: "Nashiryhotchi muvaffaqiyatli o'chirildi" });
  } catch (error) {
    next(error);
  }
};
