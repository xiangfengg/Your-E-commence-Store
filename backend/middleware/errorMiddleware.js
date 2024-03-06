
// Middleware to handle 404 errors (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.error(error.message); // Log the error message
  res.status(404)
  next (error)
}



const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500 ;
  let message = err.message || 'Internal Server Error'

  //if id is wrong (fetch single product )
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resourcee not found';
  }

  // console.error(err.stack);
  res.status(statusCode).json({ message: message, });
};
export { notFound, errorHandler };