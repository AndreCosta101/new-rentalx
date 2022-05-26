import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';



const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
    '/', 
    ensuredAuthenticated, 
    ensureAdmin, 
    createCarController.handle
    )

export { carsRoutes }