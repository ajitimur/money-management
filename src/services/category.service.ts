import { AppDataSource } from '../config/database';
import { Category } from '../entities/Category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { AppError } from '../types/error';

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: dto.name },
    });

    if (existingCategory) {
      throw new AppError('Category with this name already exists', 400);
    }

    const category = this.categoryRepository.create(dto);
    return await this.categoryRepository.save(category);
  }

  async getCategories(type?: 'INCOME' | 'EXPENSE'): Promise<Category[]> {
    const query: any = {};
    if (type) {
      query.type = type;
    }

    return await this.categoryRepository.find({
      where: query,
      order: {
        name: 'ASC',
      },
    });
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['transactions'],
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.getCategoryById(id);

    if (dto.name && dto.name !== category.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: dto.name },
      });

      if (existingCategory) {
        throw new AppError('Category with this name already exists', 400);
      }
    }

    Object.assign(category, dto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);
    
    // Check if category has transactions
    if (category.transactions && category.transactions.length > 0) {
      throw new AppError('Cannot delete category with existing transactions', 400);
    }

    await this.categoryRepository.remove(category);
  }

  // async getDefaultCategories(): Promise<Category[]> {
  //   const defaultCategories = [
  //     { name: 'Salary', type: 'INCOME', color: '#4CAF50', icon: 'work' },
  //     { name: 'Investments', type: 'INCOME', color: '#2196F3', icon: 'trending_up' },
  //     { name: 'Food & Dining', type: 'EXPENSE', color: '#FF9800', icon: 'restaurant' },
  //     { name: 'Transportation', type: 'EXPENSE', color: '#03A9F4', icon: 'directions_car' },
  //     { name: 'Shopping', type: 'EXPENSE', color: '#E91E63', icon: 'shopping_cart' },
  //     { name: 'Bills & Utilities', type: 'EXPENSE', color: '#9C27B0', icon: 'receipt' },
  //   ];

  //   const categories: Category[] = [];

  //   for (const cat of defaultCategories) {
  //     const existing = await this.categoryRepository.findOne({
  //       where: { name: cat.name },
  //     });

  //     if (!existing) {
  //       const category = this.categoryRepository.create(cat);
  //       categories.push(await this.categoryRepository.save(category));
  //     }
  //   }

  //   return categories;
  // }
} 