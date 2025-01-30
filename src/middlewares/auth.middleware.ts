import { auth } from './../configs/firebase';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../configs/jwt';

/**
 * Middleware to authenticate if partner has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const partnerAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required',
      };
    bearerToken = bearerToken.split(' ')[1];

    const decodedToken: any = verifyToken(bearerToken);
    res.locals.partner = decodedToken.id;
    res.locals.role = decodedToken.role;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to authenticate if customer has a valid Firestore token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const customerAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required',
      };
    }
    bearerToken = bearerToken.split(' ')[1];

    const decodedToken = await auth.verifyIdToken(bearerToken);
    res.locals.customer = decodedToken.uid;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if the request contains the admin-secret-key
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const checkAdminSecretKey = (req: Request, res: Response, next: NextFunction): void => {
  const adminSecretKey = req.header('x-secret-key');
  if (adminSecretKey !== process.env.ADMIN_SECRET_CODE) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized: Invalid admin secret key',
    });
  } else {
    next();
  }
};

/**
 * Middleware to check if the authenticated partner is an admin
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (res.locals.role !== 'admin') {
    res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: 'Forbidden: Admin access required',
    });
  } else {
    next();
  }
};

/**
 * Middleware to check if the authenticated partner is the owner of the resource
 * or an admin
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const isOwner = (req: Request, res: Response, next: NextFunction): void => {
  if (res.locals.role === 'admin' || (res.locals.partner && res.locals.partner === req.params._id)) {
    next();
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      code: HttpStatus.FORBIDDEN,
      message: 'Forbidden: You do not have access to this resource',
    });
  }
};