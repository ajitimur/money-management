import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { hasPermission } from '../middlewares/authorization.middleware';
import { Permission } from '../types/permission';

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AccountType:
 *       type: string
 *       enum: [CASH, BANK, CREDIT_CARD, E_WALLET, INVESTMENT, SAVINGS]
 *       description: Type of financial account
 *     
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the account
 *         name:
 *           type: string
 *           description: Name of the account
 *         type:
 *           $ref: '#/components/schemas/AccountType'
 *         balance:
 *           type: number
 *           format: float
 *           description: Current balance of the account
 *         bankName:
 *           type: string
 *           description: Name of the bank (for bank accounts)
 *         accountNumber:
 *           type: string
 *           description: Account number (for bank accounts)
 *         description:
 *           type: string
 *           description: Additional details about the account
 *         color:
 *           type: string
 *           description: Color code for UI representation
 *         icon:
 *           type: string
 *           description: Icon name for UI representation
 *         isActive:
 *           type: boolean
 *           description: Whether the account is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the account was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the account was last updated
 *     
 *     CreateAccountDto:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the account
 *         type:
 *           $ref: '#/components/schemas/AccountType'
 *         balance:
 *           type: number
 *           format: float
 *           description: Initial balance of the account
 *         bankName:
 *           type: string
 *           description: Name of the bank (for bank accounts)
 *         accountNumber:
 *           type: string
 *           description: Account number (for bank accounts)
 *         description:
 *           type: string
 *           description: Additional details about the account
 *         color:
 *           type: string
 *           description: Color code for UI representation
 *         icon:
 *           type: string
 *           description: Icon name for UI representation
 *     
 *     UpdateAccountDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the account
 *         type:
 *           $ref: '#/components/schemas/AccountType'
 *         bankName:
 *           type: string
 *           description: Name of the bank (for bank accounts)
 *         accountNumber:
 *           type: string
 *           description: Account number (for bank accounts)
 *         description:
 *           type: string
 *           description: Additional details about the account
 *         color:
 *           type: string
 *           description: Color code for UI representation
 *         icon:
 *           type: string
 *           description: Icon name for UI representation
 *         isActive:
 *           type: boolean
 *           description: Whether the account is active
 * 
 * /accounts:
 *   get:
 *     tags: [Accounts]
 *     summary: Get all user accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: includeInactive
 *         schema:
 *           type: boolean
 *         description: Whether to include inactive accounts
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Account'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   
 *   post:
 *     tags: [Accounts]
 *     summary: Create a new account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountDto'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * 
 * /accounts/{id}:
 *   get:
 *     tags: [Accounts]
 *     summary: Get account by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Account not found
 *   
 *   patch:
 *     tags: [Accounts]
 *     summary: Update account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountDto'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Account not found
 *   
 *   delete:
 *     tags: [Accounts]
 *     summary: Delete account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       204:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Account not found
 * 
 * /accounts/defaults:
 *   post:
 *     tags: [Accounts]
 *     summary: Create default accounts
 *     description: Creates a set of default accounts for the user (Cash, Bank Account, Credit Card)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Default accounts created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Account'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

const router = Router();
const accountController = new AccountController();

router.use(authenticate);

router.post('/', 
  hasPermission(Permission.CREATE_ACCOUNT),
  accountController.create
);

router.get('/', 
  hasPermission(Permission.READ_ACCOUNT),
  accountController.getAll
);

router.get('/:id', 
  hasPermission(Permission.READ_ACCOUNT),
  accountController.getOne
);

router.patch('/:id', 
  hasPermission(Permission.UPDATE_ACCOUNT),
  accountController.update
);

router.delete('/:id', 
  hasPermission(Permission.DELETE_ACCOUNT),
  accountController.delete
);

router.post('/defaults', 
  hasPermission(Permission.CREATE_ACCOUNT),
  accountController.createDefaults
);

export default router; 