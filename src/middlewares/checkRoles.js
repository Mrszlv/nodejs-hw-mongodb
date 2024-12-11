import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { ROLES } from '../constans/constans.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }
    const { role } = user;
    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }
    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { contactId } = req.params;
      if (!contactId) {
        next(createHttpError(403));
        return;
      }
      const contact = await UsersCollection.findOne({
        _id: contactId,
        userId: user._id,
      });
      if (contact) {
        next();
        return;
      }
    }
    next(createHttpError(403));
  };
