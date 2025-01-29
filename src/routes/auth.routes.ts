import express, { IRouter } from 'express';

class AuthRoutes {
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // Public routes
    this.router.post('public/login', (req, res) => {
      res.json('Welcome');
    });
    this.router.post('public/register', (req, res) => {
      res.json('Welcome');
    });

    // Admin routes
    this.router.post('admin/partners/register', (req, res) => {
      res.json('Welcome');
    });
    this.router.get('admin/me', (req, res) => {
      res.json('Welcome');
    });
    this.router.put('admin/me', (req, res) => {
      res.json('Welcome');
    });
    this.router.get('admin/partners', (req, res) => {
      res.json('Welcome');
    });
    this.router.put('admin/partners/:id', (req, res) => {
      res.json('Welcome');
    });

    // Partner routes
    this.router.get('partner/me', (req, res) => {
      res.json('Welcome');
    });
    this.router.put('partner/me', (req, res) => {
      res.json('Welcome');
    });
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default AuthRoutes;
