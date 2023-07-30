const express = require("express");
const bcryptjs = require("bcryptjs");
const Admin = require("../../mongomodels/Admin");
const { NotFoundError } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.createAdmin = async (req, res, next) => {
  try {
    const { full_name, username, password, is_super } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const admin = new Admin({
      full_name,
      username,
      password: hashedPassword,
      is_super,
    });

    await admin.save();

    res.status(201).json(admin);
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

exports.getAdmins = async (req, res, next) => {
  try {
    const { q, sort, filters, page = 1, limit = 10 } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { full_name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ];
    }

    let sortObject = {};
    if (sort) {
      const [by, order] = sort.split(":");
      sortObject[by] = order === "desc" ? -1 : 1;
    } else {
      sortObject = { full_name: 1 };
    }

    if (filters && filters.is_deleted) {
      query.is_deleted = filters.is_deleted;
    } else {
      query.is_deleted = false;
    }

    const count = await Admin.countDocuments(query);
    const admins = await Admin.find(query)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      limit,
      count,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    res.json(admin);
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

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, password } = req.body;

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const admin = await Admin.findByIdAndUpdate(
    id,
    { full_name, username, password: hashedPassword },
    { new: true }
  );

  if (!admin) {
    throw new NotFoundError("Admin not found");
  }

  res.json(admin);
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.updateOwnAdmin = async (req, res, next) => {
  try {
    const { full_name, username, password } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { full_name, username, password: hashedPassword },
      { new: true }
    );

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    res.json(admin);
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

exports.deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }
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

exports.getDeletedAdmins = async (req, res, next) => {
  try {
    const { q, sort, page = 1, limit = 10 } = req.query;

    const query = {
      is_deleted: true,
    };

    if (q) {
      query.$or = [
        { full_name: { $regex: q, $options: "i" } },
        { username: { $regex: q, $options: "i" } },
      ];
    }

    let sortObject = {};
    if (sort) {
      const [by, order] = sort.split(":");
      sortObject[by] = order === "desc" ? -1 : 1;
    } else {
      sortObject = { full_name: 1 };
    }

    const count = await Admin.countDocuments(query);
    const admins = await Admin.find(query)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      limit,
      count,
      data: admins,
    });
  } catch (error) {
    next(error);
  }
};
