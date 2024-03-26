// Invalid route handler middleware
export const invalidRouteHandlerMiddleware = (req, res, next) => {
  return res.status(404).json({
    success: false,
    msg: `Invalid Path: ${req.originalUrl}`,
  });
};
