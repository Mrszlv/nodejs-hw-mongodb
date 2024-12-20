import createHttpError from 'http-errors';

import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }
  const [bearer, accessToken] = authorization.split(' ', 2);
  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }
  const session = await SessionCollection.findOne({ accessToken });
  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError(401, 'Access token is expired'));
  }
  const user = await UsersCollection.findById(session.userId);
  if (user === null) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;
  next();
};
