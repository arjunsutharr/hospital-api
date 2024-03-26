import ErrorHandler from "../utils/errorHandler.js";

// custom error handler middleware
export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "server error! Please Try Later!!";
    res.status(err.statusCode).json({ success: false, error: err.message });
  } else {
    res.status(500).json({
      success: false,
      error: "server error! Please Try Again Later!!",
    });
  }
};
