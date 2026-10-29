import jwt from 'jsonwebtoken';

export const protectAdmin = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_jwt_secret_dev_key'
      );
      req.admin = decoded;
      return next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, no token provided' });
  }
};
