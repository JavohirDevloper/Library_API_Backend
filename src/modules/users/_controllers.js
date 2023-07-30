const express = require("express");
const { NotBeforeError } = require("jsonwebtoken");
const Borrower = require("../../mongomodels/User");
const {
  BadRequestError,
  ServerError,
  NotFoundError,
} = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.createBorrower = async (req, res, next) => {
  try {
    const { full_name, address, phone } = req.body;

    const existingBorrower = await Borrower.findOne({ phone });
    if (existingBorrower) {
      throw new BadRequestError(
        "Bu telefon raqami allaqachon ro'yxatdan o'tgan"
      );
    }

    const borrower = new Borrower({
      full_name,
      address,
      phone,
    });

    await borrower.save();

    res.status(201).json(borrower);
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

exports.getBorrowers = async (req, res, next) => {
  try {
    const { q, sort, filters, page = 1, limit = 10 } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { full_name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
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

    const count = await Borrower.countDocuments(query);
    const borrowers = await Borrower.find(query)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      count,
      data: borrowers,
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

exports.getBorrowerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const borrower = await Borrower.findById(id);
    if (!borrower) {
      throw new NotBeforeError("Borrower not found");
    }

    res.status(200).json(borrower);
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

exports.updateBorrower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, address, phone } = req.body;

    const borrower = await Borrower.findByIdAndUpdate(
      id,
      { full_name, address, phone },
      { new: true }
    );
    if (!borrower) {
      throw new NotBeforeError("Borrower not found");
    }

    res.status(200).json(borrower);
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

exports.removeBorrower = async (req, res, next) => {
  try {
    const { id } = req.params;

    const borrower = await Borrower.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    if (!borrower) {
      throw new NotFoundError("Borrower not found");
    }

    res.status(200).json({
      message: "Borrower deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
