import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { hasPermission } from '../middlewares/authorization.middleware';
import { Permission } from '../types/permission';

const router = Router();
const categoryController = new CategoryController();

router.use(authenticate);

router.post('/', 
  hasPermission(Permission.CREATE_CATEGORY),
  categoryController.create
);

router.get('/', 
  hasPermission(Permission.READ_CATEGORY),
  categoryController.getAll
);

router.get('/:id', 
  hasPermission(Permission.READ_CATEGORY),
  categoryController.getOne
);

router.patch('/:id', 
  hasPermission(Permission.UPDATE_CATEGORY),
  categoryController.update
);

router.delete('/:id', 
  hasPermission(Permission.DELETE_CATEGORY),
  categoryController.delete
);

// router.post('/defaults', 
//   hasPermission(Permission.CREATE_CATEGORY),
//   categoryController.createDefaults
// );

export default router; 