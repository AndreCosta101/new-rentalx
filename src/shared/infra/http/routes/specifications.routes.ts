import { Router } from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();


// specificationsRoutes.use(ensuredAuthenticated)
specificationsRoutes.post(
    '/', 
    ensuredAuthenticated, 
    ensureAdmin, 
    createSpecificationController.handle )


export { specificationsRoutes};