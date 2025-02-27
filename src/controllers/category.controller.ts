import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateCategoryDto, req.body);
      await validateOrReject(dto);

      const category = await this.categoryService.createCategory(dto);
      
      res.status(201).json({
        status: 'success',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const type = req.query.type as 'INCOME' | 'EXPENSE' | undefined;
      const categories = await this.categoryService.getCategories(type);

      res.status(200).json({
        status: 'success',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await this.categoryService.getCategoryById(Number(req.params.id));

      res.status(200).json({
        status: 'success',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(UpdateCategoryDto, req.body);
      await validateOrReject(dto);

      const category = await this.categoryService.updateCategory(Number(req.params.id), dto);

      res.status(200).json({
        status: 'success',
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.categoryService.deleteCategory(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // createDefaults = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const categories = await this.categoryService.getDefaultCategories();

  //     res.status(201).json({
  //       status: 'success',
  //       data: categories,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
} 