const express = require("express");
const Author = require("../../mongomodels/Author");
const httpValidator = require("../../shared/http-validator");
const {
  createAuthorSchema,
  getAuthorByIdSchema,
  updateAuthorSchema,
  removeAuthorSchema,
} = require("./_schemas.js");
const addAuthor = require("./add-author");
const { editAuthor } = require("./edit-author");
const { NotFoundError, BadRequestError } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.createAuthor = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, createAuthorSchema);
    const { name } = req.body;
    const existingauthor = await Author.findOne({ name });

    if (existingauthor) {
      throw new BadRequestError("This author name is already registered");
    }
    const result = await addAuthor(name);

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

exports.getAuthors = async (req, res, next) => {
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

    const count = await Author.countDocuments(query);
    const authors = await Author.find(query)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      count,
      data: authors,
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

exports.getAuthorById = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, getAuthorByIdSchema);

    const { id } = req.params;

    const author = await Author.findById(id);
    if (!author) {
      throw new NotFoundError("Author not found");
    }

    res.status(200).json(author);
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

exports.updateAuthor = async (req, res, next) => {
  try {
    httpValidator({ body: req.body, params: req.params }, updateAuthorSchema);

    const { id } = req.params;
    const result = await editAuthor(id, req.body);

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

exports.removeAuthor = async (req, res, next) => {
  httpValidator({ params: req.params }, removeAuthorSchema);

  try {
    const { id } = req.params;

    const author = await Author.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    if (!author) {
      throw new NotFoundError('Author not found"');
    }

    res.status(200).json({
      message: "Author deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
