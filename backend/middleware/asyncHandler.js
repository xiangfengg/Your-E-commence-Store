const asyncHandler = (handler) => {
  return (req, res, next) => {
    // Execute the route handler function
    Promise.resolve(handler(req, res, next))
      // Catch any errors that occur asynchronously
      .catch((err) => {
        // Pass the error to the next middleware
        next(err);
      });
  };
};

export default asyncHandler;
