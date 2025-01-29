import AuthRoutes from './auth.routes';
import ProjectRoutes from './project.routes';
import express, { IRouter } from 'express';
const router = express.Router();
const combinedRouter = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  // Use AuthRoutes
  const authRoutes = new AuthRoutes();
  // Use ProjectRoutes
  const projectRoutes = new ProjectRoutes();

  // Combine routes
  combinedRouter.use(authRoutes.getRoutes());
  combinedRouter.use(projectRoutes.getRoutes());

  router.use('', combinedRouter);

  return router;
};

export default routes;
