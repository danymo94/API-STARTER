import { log } from './../../node_modules/@grpc/grpc-js/src/logging';
import HttpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { signToken } from '../configs/jwt';
import AuthService from '../services/auth.service';
import { IUser } from '../interfaces/users.interface';

class AuthController {
  public authService = new AuthService();

  /**
   * Controller to login a partner
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await this.authService.getUserByEmail(email);
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          code: HttpStatus.UNAUTHORIZED,
          message: 'User does not exist',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password',
        });
      }

      const token = signToken({ id: user.id, role: user.role });
      const role = user.role;
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: { token, role },
        message: 'Login successful',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to register a new admin
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public registerAdmin = async (req: Request, res: Response, next: NextFunction): Promise<IUser> => {
    try {
      const data = req.body;
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      data.role = 'admin';
      data.createdAt = new Date();
      data.updateAt = new Date();
      const newAdmin = await this.authService.newUser(data as IUser);
      const token = signToken({ id: newAdmin.id, role: newAdmin.role });
      const role = newAdmin.role;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: { token, role },
        message: 'Admin registered successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to register a new partner
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public registerPartner = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email, password, fullName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newPartner = await this.authService.newUser({
        email,
        password: hashedPassword,
        fullName,
        role: 'partner',
        // ...altri campi necessari...
      });
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: newPartner,
        message: 'Partner registered successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get admin details
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAdminDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const adminId = res.locals.partner;
      console.log(adminId);
      const adminDetails = await this.authService.getUserById(adminId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: adminDetails,
        message: 'Admin details retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update admin details
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateAdminDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const adminId = res.locals.partner;
      const updatedAdmin = await this.authService.updateUser(adminId, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: updatedAdmin,
        message: 'Admin details updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get all partners
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllPartners = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const partners = await this.authService.getAllPartners();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: partners,
        message: 'All partners retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update partner details
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updatePartnerDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const partnerId = req.params.id;
      const updatedPartner = await this.authService.updateUser(partnerId, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: updatedPartner,
        message: 'Partner details updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get partner details
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getPartnerDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const partnerId = res.locals.partner;
      const partnerDetails = await this.authService.getUserById(partnerId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: partnerDetails,
        message: 'Partner details retrieved successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update partner details
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updatePartnerDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const partnerId = res.locals.partner;
      const updatedPartner = await this.authService.updateUser(partnerId, req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: updatedPartner,
        message: 'Partner details updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
