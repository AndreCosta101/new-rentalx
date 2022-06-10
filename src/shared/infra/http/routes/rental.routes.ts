import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ReturningRentalController } from '../../../../modules/rentals/useCases/returningRental/ReturningRentalController';
import{ ensuredAuthenticated } from '../middlewares/ensureAuthenticated';


const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returningRentalController = new ReturningRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post( '/', ensuredAuthenticated, createRentalController.handle);
rentalRoutes.post( '/return/:id', ensuredAuthenticated, returningRentalController.handle);
rentalRoutes.get( '/user', ensuredAuthenticated, listRentalsByUserController.handle);


export { rentalRoutes}