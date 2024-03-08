module.exports = generateError = (err, errCode) => {
  const error = new Error(err);
  error.status = errCode;
  throw error;
};
