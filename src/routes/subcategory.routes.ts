import { Router } from 'express';
import { SubCategoryController } from '../controllers/subcategory.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const subCategoryController = new SubCategoryController();

router.use(authenticate);

router.post('/', subCategoryController.create);
router.get('/', subCategoryController.getAll);
router.get('/:id', subCategoryController.getOne);
router.patch('/:id', subCategoryController.update);
router.delete('/:id', subCategoryController.delete);
// router.post('/category/:categoryId/defaults', subCategoryController.createDefaults);

export default router; 