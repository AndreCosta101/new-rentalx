import { Router } from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();


specificationsRoutes.use(ensuredAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle )


export { specificationsRoutes};