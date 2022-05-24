import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from '../../useCases/createCategory/CreateCategoryUseCase';

let categoriesRepositoryInMemory =  new CategoriesRepositoryInMemory()
let createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);

describe('Create Category', () => {

    beforeEach(() => {

    })

    it("should be able to create a new category", async() => {
        const category = {
            name: 'Category Test',
            description: 'category test description'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated  =  await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")
    })

    it("should not be able to create a new category with a name that already exists", async() => {
        expect( async ()=>{
            const category = {
                name: 'Category Test',
                description: 'category test description'
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError)

    })
})