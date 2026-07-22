const Category = require('../models/category');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.getAllCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        status: 'success',
        results: categories.length,
        message: 'Categories retrieved successfully',
        data: {
            categories,
        },
    });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'Category retrieved successfully',
        data: { 
category },
    });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        data: {
            category,
        },
    });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
        data: {
            category,
        },
    });
});


exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(new AppError('Category not found', 404));
    }
    res.status(204).json({
        status: 'success',
        message: 'Category deleted successfully',
        data: null,
    });
});