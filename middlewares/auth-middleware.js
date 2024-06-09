
const jwt =require( 'jsonwebtoken')
const UserModel =require( '../models/User.js')

class authMiddleware{
 static checkUserAuth = async (req, res, next) => {

  let token

  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token =require() header
      token = authorization.split(' ')[1]

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      // Get User =require() Token
      req.user = await UserModel.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}


static verifyToken = (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers['authorization'] || req.query.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Add the decoded token payload to the request object
    req.user = decoded;
    // Call next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    console.error(error);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};


}

module.exports= authMiddleware