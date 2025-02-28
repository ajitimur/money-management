import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { hasPermission } from '../middlewares/authorization.middleware';
import { Permission } from '../types/permission';

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [INCOME, EXPENSE]
 *         color:
 *           type: string
 *         icon:
 *           type: string
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Get a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *   patch:
 *     tags: [Categories]
 *     summary: Update a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *   delete:
 *     tags: [Categories]
 *     summary: Delete a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */

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