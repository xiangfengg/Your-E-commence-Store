import jwt from 'jsonwebtoken';



const generateToken = (res, userId) => {

// The payload of the token contains the userId passed as an argument.
// The JWT is signed using the provided secret key (process.env.JWT_SECRET).

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  //res.cookie is provided by express
  // use res.cookie to set a token as a cookie in the response, it's sent to the client as part of the response headers. Once the client receives the cookie, it automatically includes it in future requests to your server. 

  res.cookie('token', token, {

  //  The httpOnly option is set to true, which ensures that the cookie is only accessible via HTTP(S) requests and not from JavaScript code

    httpOnly: true, 
    secure:process.env.NODE.ENV!='development',
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30*24 * 60 * 60 * 1000, // 1d in milliseconds
  });
};

export default generateToken;
