const { successResponse, errorResponse } = require("../utils/response.util");

exports.handleBFHL = (req, res) => {
  const body = req.body;

  // Rule 1: body must exist
  if (!body || typeof body !== "object") {
    return res.status(400).json(
      errorResponse("Invalid JSON body")
    );
  }

  const keys = Object.keys(body);

  // Rule 2: exactly one key
  if (keys.length !== 1) {
    return res.status(400).json(
      errorResponse("Exactly one key is required")
    );
  }

  const key = keys[0];
  const value = body[key];

  const allowedKeys = ["fibonacci", "prime", "lcm", "hcf", "AI"];

  // Rule 3: allowed key check
  if (!allowedKeys.includes(key)) {
    return res.status(400).json(
      errorResponse("Invalid key")
    );
  }

  // Rule 4: value validation
  if (key === "fibonacci") {
    if (!Number.isInteger(value) || value <= 0) {
      return res.status(400).json(
        errorResponse("Fibonacci value must be a positive integer")
      );
    }
  }

  if (["prime", "lcm", "hcf"].includes(key)) {
    if (
      !Array.isArray(value) ||
      value.length === 0 ||
      !value.every(num => Number.isInteger(num) && num > 0)
    ) {
      return res.status(400).json(
        errorResponse(`${key} must be a non-empty array of positive integers`)
      );
    }
  }

  if (key === "AI") {
    if (typeof value !== "string" || value.trim().length === 0) {
      return res.status(400).json(
        errorResponse("AI input must be a non-empty string")
      );
    }
  }

  // 🚧 TEMP success (logic comes next)
  return res.status(200).json(
    successResponse("Validation passed")
  );
};
