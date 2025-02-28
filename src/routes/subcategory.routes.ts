import { Router } from 'express';
import { SubCategoryController } from '../controllers/subcategory.controller';
import { authenticate } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategory management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         color:
 *           type: string
 *         icon:
 *           type: string
 *         categoryId:
 *           type: integer
 *       required:
 *         - name
 *         - categoryId
 */

/**
 * @swagger
 * /api/sub-categories:
 *   post:
 *     tags: [SubCategories]
 *     summary: Create a new subcategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *   get:
 *     tags: [SubCategories]
 *     summary: Get all subcategories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter subcategories by category ID
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */

/**
 * @swagger
 * /api/sub-categories/{id}:
 *   get:
 *     tags: [SubCategories]
 *     summary: Get a subcategory by ID
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
 *         description: SubCategory details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *   patch:
 *     tags: [SubCategories]
 *     summary: Update a subcategory
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
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: SubCategory updated successfully
 *   delete:
 *     tags: [SubCategories]
 *     summary: Delete a subcategory
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
 *         description: SubCategory deleted successfully
 */

/**
 * @swagger
 * /api/sub-categories/category/{categoryId}/defaults:
 *   post:
 *     tags: [SubCategories]
 *     summary: Create default subcategories for a category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Default subcategories created successfully
 */

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