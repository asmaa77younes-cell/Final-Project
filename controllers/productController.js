const Product = require("../models/product");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const Category = require("../models/category");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.maxPrice) {
    filter.price = {
      $lte: req.query.maxPrice,
    };
  }

  if (req.query.minPrice) {
    filter.price = {
      ...filter.price,
      $gte: req.query.minPrice,
    };
  }

  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = {
      $gte: req.query.minPrice,
      $lte: req.query.maxPrice,
    };
  }
  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }

  if (req.query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }
  console.log(filter);
  const products = await Product.find(filter).populate("category", "name");
  res.status(200).json({
    status: "success",
    results: products.length,
    message: "Products retrieved successfully",
    data: {
      products,
    },
  });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name description",
  );
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product retrieved successfully",
    data: {
      product,
    },
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: {
      product,
    },
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: {
      product,
    },
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  res.status(204).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});
