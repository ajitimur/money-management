import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const categoryController = new CategoryController();

router.use(authenticate);

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);
// router.post('/defaults', categoryController.createDefaults);

export default router; 