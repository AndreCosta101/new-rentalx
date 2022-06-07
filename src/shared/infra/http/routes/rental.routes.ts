import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import{ ensuredAuthenticated } from '../middlewares/ensureAuthenticated';


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post(
    '/', 
    ensuredAuthenticated,
    createRentalController.handle
    );


export { rentalRoutes}