import express, { IRouter } from 'express';

class ProjectRoutes {
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // Public routes
    this.router.get('public/projects', (req, res) => {
      res.json('Welcome');
    });
    this.router.get('public/projects/:id', (req, res) => {
        res.json('Welcome');
      });

    // Admin routes
    this.router.post('admin/projects', (req, res) => {
      res.json('Welcome');
    });
    this.router.get('admin/projects', (req, res) => {
      res.json('Welcome');
    });
    this.router.put('admin/projects/:id', (req, res) => {
      res.json('Welcome');
    });
    this.router.delete('admin/partners/:id', (req, res) => {
      res.json('Welcome');
    });


    // Partner routes
    this.router.get('partner/projects', (req, res) => {
      res.json('Welcome');
    });
    this.router.put('partner/projects/:id', (req, res) => {
      res.json('Welcome');
    });
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default ProjectRoutes;
