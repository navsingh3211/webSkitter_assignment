const response = async (success, message, data = {}) => {
  return {
      success,
      message,
      data
  }
};
const authenticationResponse = async (
  success,
  message,
  validation = {},
  data = {}
) => {
  return {
    success,
    message,
    validation,
    data
  };
};

export {
  response,
  authenticationResponse
}