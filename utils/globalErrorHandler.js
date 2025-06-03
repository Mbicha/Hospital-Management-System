import { config } from "../config/config.js";
import AppError from "./appError.js";

const handleCastError = err => {
  const message = `Invalid ${err.path}, ${err.value}`
  return new AppError(message, 400);
}

const handleDuplicateFields = err => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  console.log(field, value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
}

const handleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`
  return new AppError(message, 400)

}

const productionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something Went Wrong!!'
    })
  }

}

const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (config.ENV === "development") {

    developmentError(err, res);
  } else if (config.ENV === "production") {
    let error = { ...err }

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === "ValidationError") error = handleValidationError(error);

    productionError(error, res);
  }
}

export default globalErrorHandler;
