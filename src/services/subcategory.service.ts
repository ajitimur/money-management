import { AppDataSource } from '../config/database';
import { SubCategory } from '../entities/SubCategory.entity';
import { Category } from '../entities/Category.entity';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from '../dtos/subcategory.dto';
import { AppError } from '../types/error';

export class SubCategoryService {
  private subCategoryRepository = AppDataSource.getRepository(SubCategory);
  private categoryRepository = AppDataSource.getRepository(Category);

  async createSubCategory(dto: CreateSubCategoryDto): Promise<SubCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new AppError('Parent category not found', 404);
    }

    const existingSubCategory = await this.subCategoryRepository.findOne({
      where: { 
        name: dto.name,
        categoryId: dto.categoryId
      },
    });

    if (existingSubCategory) {
      throw new AppError('SubCategory with this name already exists in the category', 400);
    }

    const subCategory = this.subCategoryRepository.create(dto);
    return await this.subCategoryRepository.save(subCategory);
  }

  async getSubCategories(categoryId?: string): Promise<SubCategory[]> {
    const query: any = {};
    if (categoryId) {
      query.categoryId = categoryId;
    }

    return await this.subCategoryRepository.find({
      where: query,
      relations: ['category'],
      order: {
        name: 'ASC',
      },
    });
  }

  async getSubCategoryById(id: number): Promise<SubCategory> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category', 'transactions'],
    });

    if (!subCategory) {
      throw new AppError('SubCategory not found', 404);
    }

    return subCategory;
  }

  async updateSubCategory(id: number, dto: UpdateSubCategoryDto): Promise<SubCategory> {
    const subCategory = await this.getSubCategoryById(id);

    if (dto.name && dto.name !== subCategory.name) {
      const existingSubCategory = await this.subCategoryRepository.findOne({
        where: { 
          name: dto.name,
          categoryId: subCategory.categoryId
        },
      });

      if (existingSubCategory) {
        throw new AppError('SubCategory with this name already exists in the category', 400);
      }
    }

    Object.assign(subCategory, dto);
    return await this.subCategoryRepository.save(subCategory);
  }

  async deleteSubCategory(id: number): Promise<void> {
    const subCategory = await this.getSubCategoryById(id);
    
    if (subCategory.transactions && subCategory.transactions.length > 0) {
      throw new AppError('Cannot delete subcategory with existing transactions', 400);
    }

    await this.subCategoryRepository.remove(subCategory);
  }

  // async getDefaultSubCategories(categoryId: number): Promise<SubCategory[]> {
  //   const category = await this.categoryRepository.findOne({
  //     where: { id: categoryId },
  //   });

  //   if (!category) {
  //     throw new AppError('Category not found', 404);
  //   }

  //   const defaultSubCategories: { name: string; icon?: string }[] = [];

  //   // Add default subcategories based on category type
  //   if (category.type === 'EXPENSE') {
  //     switch (category.name) {
  //       case 'Food & Dining':
  //         defaultSubCategories.push(
  //           { name: 'Restaurants', icon: 'restaurant' },
  //           { name: 'Groceries', icon: 'shopping_basket' },
  //           { name: 'Coffee Shops', icon: 'local_cafe' }
  //         );
  //         break;
  //       case 'Transportation':
  //         defaultSubCategories.push(
  //           { name: 'Public Transport', icon: 'directions_bus' },
  //           { name: 'Fuel', icon: 'local_gas_station' },
  //           { name: 'Parking', icon: 'local_parking' }
  //         );
  //         break;
  //       // Add more default subcategories for other categories
  //     }
  //   }

  //   const subCategories: SubCategory[] = [];

  //   for (const subCat of defaultSubCategories) {
  //     const existing = await this.subCategoryRepository.findOne({
  //       where: { 
  //         name: subCat.name,
  //         categoryId: category.id
  //       },
  //     });

  //     if (!existing) {
  //       const subCategory = this.subCategoryRepository.create({
  //         ...subCat,
  //         categoryId: category.id,
  //       });
  //       subCategories.push(await this.subCategoryRepository.save(subCategory));
  //     }
  //   }

  //   return subCategories;
  // }
} 