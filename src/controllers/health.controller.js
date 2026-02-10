const { successResponse } = require("../utils/response.util");

exports.healthCheck = (req, res) => {
  return res.status(200).json(
    successResponse()
  );
};
