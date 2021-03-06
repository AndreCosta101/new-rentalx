import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensuredAuthenticated } from '../middlewares/ensureAuthenticated';



const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
    '/', 
    ensuredAuthenticated, 
    ensureAdmin, 
    createCategoryController.handle 
    );

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
    '/import', 
    ensuredAuthenticated, 
    ensureAdmin, 
    upload.single('file'), importCategoryController.handle)


export { categoriesRoutes }
