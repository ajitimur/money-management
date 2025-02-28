import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticate } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The transaction ID
 *         amount:
 *           type: number
 *           format: float
 *           description: The transaction amount
 *         description:
 *           type: string
 *           description: Description of the transaction
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the transaction
 *         type:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *           description: Type of transaction
 *         categoryId:
 *           type: integer
 *           description: ID of the associated category
 *         subCategoryId:
 *           type: integer
 *           description: ID of the associated subcategory
 *         notes:
 *           type: string
 *           description: Additional notes about the transaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the transaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the transaction was last updated
 *       required:
 *         - amount
 *         - description
 *         - date
 *         - type
 *         - categoryId
 *     
 *     CreateTransactionDto:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - date
 *         - type
 *         - categoryId
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         type:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         categoryId:
 *           type: integer
 *         subCategoryId:
 *           type: integer
 *         notes:
 *           type: string
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions
 *     description: Retrieve all transactions with optional filtering by date range and type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering transactions (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering transactions (YYYY-MM-DD)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         description: Filter transactions by type
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 count:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   
 *   post:
 *     tags: [Transactions]
 *     summary: Create a new transaction
 *     description: Create a new transaction with the provided data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDto'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get a transaction by ID
 *     description: Retrieve a single transaction by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 *   
 *   patch:
 *     tags: [Transactions]
 *     summary: Update a transaction
 *     description: Update an existing transaction by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDto'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 *   
 *   delete:
 *     tags: [Transactions]
 *     summary: Delete a transaction
 *     description: Delete an existing transaction by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */

const router = Router();
const transactionController = new TransactionController();

router.use(authenticate);

router.get('/', transactionController.getAll);
router.post('/', transactionController.create);
router.get('/:id', transactionController.getOne);
router.patch('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router; 