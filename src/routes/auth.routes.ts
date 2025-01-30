import { partnerAuth, isAdmin, checkAdminSecretKey, isOwner } from './../middlewares/auth.middleware';
import express, { IRouter } from 'express';
import AuthController from '../controllers/auth.controller';

/**
 * Class representing authentication routes.
 */
class AuthRoutes {
  private router = express.Router();
  private authController = new AuthController();

  constructor() {
    this.routes();
  }

  /**
   * Define all routes for authentication.
   */
  private routes = (): void => {
    // Public routes

    /**
     * @route POST /public/login
     * @desc Login all users with email and password
     * @access Public
     */
    this.router.post('/public/login', this.authController.login);

    /**
     * @route POST /public/register
     * @desc Register admin with secret key
     * @access Public
     */
    this.router.post('/public/register', checkAdminSecretKey, this.authController.registerAdmin);

    // Admin routes

    /**
     * @route POST /admin/partners/register
     * @desc Register a partner (Only Admin)
     * @access Admin
     */
    this.router.post('/admin/partners/register', partnerAuth, isAdmin, this.authController.registerPartner);

    /**
     * @route GET /admin/me
     * @desc Get Admin details (Only Admin and Only itself)
     * @access Admin
     */
    this.router.get('/admin/me', partnerAuth, isAdmin, this.authController.getAdminDetails);

    /**
     * @route PUT /admin/me
     * @desc Update Admin details (Only Admin and Only itself)
     * @access Admin
     */
    this.router.put('/admin/me', partnerAuth, isAdmin, this.authController.updateAdminDetails);

    /**
     * @route GET /admin/partners
     * @desc Get all partners (Only Admin)
     * @access Admin
     */
    this.router.get('/admin/partners', partnerAuth, isAdmin, this.authController.getAllPartners);

    /**
     * @route PUT /admin/partners/:id
     * @desc Edit a partner (Only Admin)
     * @access Admin
     */
    this.router.put('/admin/partners/:id', partnerAuth, isAdmin, this.authController.updatePartnerDetails);

    // Partner routes

    /**
     * @route GET /partner/me
     * @desc Get partner details (Only Partner only itself)
     * @access Partner
     */
    this.router.get('/partner/me', partnerAuth, this.authController.getPartnerDetails);

    /**
     * @route PUT /partner/me
     * @desc Update partner details (Only Partner only itself not fee type or fee)
     * @access Partner
     */
    this.router.put('/partner/me', partnerAuth, this.authController.updatePartnerDetails);
  };

  /**
   * Get the defined routes.
   * @returns {IRouter} The router with defined routes.
   */
  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AuthRoutes;
