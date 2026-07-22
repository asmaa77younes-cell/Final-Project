const AppError = require("../utils/AppError");

const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
}

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(errors.join(". "), 400);
}

const handleDuplicateKeyError = (err) => {
  const value = Object.values(err.keyValue)[0];
  return new AppError(
    `Duplicate field value: ${value}. please use another value.`,
    409
  );
}

const errorHandler = (err, req, res, next) => {
  let error = err;
  error.message = err.message;
  if (err.name === "CastError") error = handleCastError(err);
  if (err.name === "ValidationError") error = handleValidationError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Internal Server Error",
});
};

module.exports = errorHandler;
