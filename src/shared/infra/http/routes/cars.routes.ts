import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';



const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
    '/', 
    ensuredAuthenticated, 
    ensureAdmin, 
    createCarController.handle
    );

carsRoutes.get('/available', listAvailableCarsController.handle )

carsRoutes.post(
    '/specifications/:id', 
    ensuredAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
    )

export { carsRoutes }