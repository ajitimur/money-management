import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const transactionController = new TransactionController();

router.use(authenticate);

router.post('/', transactionController.create);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getOne);
router.patch('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router; 