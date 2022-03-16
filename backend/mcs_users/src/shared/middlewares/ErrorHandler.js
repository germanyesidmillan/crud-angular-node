module.exports = (err, res, logger, Fail) => {
  // eslint-disable-line no-unused-vars
  logger.error("ErrorHandler", err);
  return res.status(err.status || 500).json(Fail(err));
};
