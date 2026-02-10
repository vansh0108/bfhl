const { successResponse, errorResponse } = require("../utils/response.util");
const { getAIResponse } = require("../services/ai.service");

exports.handleBFHL = async (req, res) => {
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

    // === LOGIC EXECUTION ===

  let result;

  if (key === "fibonacci") {
    const n = value;
    const series = [];

    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
      series.push(a);
      [a, b] = [b, a + b];
    }

    result = series;
  }

  if (key === "prime") {
    const nums = value;

    const isPrime = (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    result = nums.filter(isPrime);
  }

    if (key === "lcm") {
    const nums = value;

    const gcd = (a, b) => {
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    const lcm = (a, b) => (a * b) / gcd(a, b);

    result = nums.reduce((acc, curr) => lcm(acc, curr));
  }

  if (key === "hcf") {
    const nums = value;

    const gcd = (a, b) => {
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    result = nums.reduce((acc, curr) => gcd(acc, curr));
  }
    if (key === "AI") {
    try {
      result = await getAIResponse(value);
    } catch (err) {
      return res.status(503).json(
        errorResponse("AI service unavailable")
      );
    }
  }

  return res.status(200).json(
    successResponse(result)
  );

};
