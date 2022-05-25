import { container } from 'tsyringe';

import { ICategoriesRepository} from '../../modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import {IUsersRepository} from '../../modules/accounts/repositories/IUsersRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';

import { CategoriesRepository } from '../../modules/cars/infra/repositories/CategoriesRepository';
import { CarsRepository } from '../../modules/cars/infra/repositories/CarsRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/repositories/SpecificationsRepository';
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);