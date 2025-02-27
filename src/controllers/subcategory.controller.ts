import { Request, Response, NextFunction } from 'express';
import { SubCategoryService } from '../services/subcategory.service';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from '../dtos/subcategory.dto';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class SubCategoryController {
  private subCategoryService: SubCategoryService;

  constructor() {
    this.subCategoryService = new SubCategoryService();
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(CreateSubCategoryDto, req.body);
      await validateOrReject(dto);

      const subCategory = await this.subCategoryService.createSubCategory(dto);
      
      res.status(201).json({
        status: 'success',
        data: subCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.query.categoryId as string | undefined;
      const subCategories = await this.subCategoryService.getSubCategories(categoryId);

      res.status(200).json({
        status: 'success',
        data: subCategories,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const subCategory = await this.subCategoryService.getSubCategoryById(Number(req.params.id));

      res.status(200).json({
        status: 'success',
        data: subCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = plainToClass(UpdateSubCategoryDto, req.body);
      await validateOrReject(dto);

      const subCategory = await this.subCategoryService.updateSubCategory(Number(req.params.id), dto);

      res.status(200).json({
        status: 'success',
        data: subCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.subCategoryService.deleteSubCategory(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  // createDefaults = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const subCategories = await this.subCategoryService.getDefaultSubCategories(Number(req.params.categoryId));

  //     res.status(201).json({
  //       status: 'success',
  //       data: subCategories,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
} 