exports.successResponse = (data = null) => {
  const response = {
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  };

  if (data !== null) {
    response.data = data;
  }

  return response;
};

exports.errorResponse = (message) => {
  return {
    is_success: false,
    error: message
  };
};
