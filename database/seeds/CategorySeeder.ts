import { DataSource } from 'typeorm';
import { Category } from '../../src/entities/Category.entity';
import { SubCategory } from '../../src/entities/SubCategory.entity';

export class CategorySeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const categoryRepository = this.dataSource.getRepository(Category);
    const subCategoryRepository = this.dataSource.getRepository(SubCategory);

    const categoryData = [
      {
        name: 'Food & Beverages',
        type: 'EXPENSE',
        color: '#FF5722',
        icon: 'restaurant',
        subCategories: [
          { name: 'Groceries', icon: 'basket' },
          { name: 'Restaurant, Cafe, Eating Out', icon: 'restaurant' }
        ]
      },
      {
        name: 'Shopping',
        type: 'EXPENSE',
        color: '#E91E63',
        icon: 'cart',
        subCategories: [
          { name: 'Clothes & Footwear', icon: 'shirt' },
          { name: 'Drug-store, chemist', icon: 'medkit' },
          { name: 'Electronics, accessories', icon: 'hardware-chip' },
          { name: 'Gifts, joy', icon: 'gift' },
          { name: 'Health and beauty', icon: 'fitness' },
          { name: 'Home, garden', icon: 'home' },
          { name: 'Jewels, accessories', icon: 'diamond' },
          { name: 'Kids', icon: 'people' },
          { name: 'Leisure time', icon: 'game-controller' },
          { name: 'Pets, animals', icon: 'paw' },
          { name: 'Stationery, tools', icon: 'build' }
        ]
      },
      {
        name: 'Housing',
        type: 'EXPENSE',
        color: '#9C27B0',
        icon: 'home',
        subCategories: [
          { name: 'Energy, utilities', icon: 'flash' },
          { name: 'Maintenance, repairs', icon: 'hammer' },
          { name: 'Mortgage', icon: 'business' },
          { name: 'Property insurance', icon: 'shield' },
          { name: 'Rent', icon: 'business' },
          { name: 'Services', icon: 'construct' }
        ]
      },
      {
        name: 'Transportation',
        type: 'EXPENSE',
        color: '#3F51B5',
        icon: 'car',
        subCategories: [
          { name: 'Business trips', icon: 'briefcase' },
          { name: 'Long distance', icon: 'airplane' },
          { name: 'Public transport', icon: 'bus' },
          { name: 'Taxi', icon: 'car' },
          { name: 'Fuel', icon: 'flame' },
          { name: 'Leasing', icon: 'card' },
          { name: 'Parking', icon: 'car' },
          { name: 'Rentals', icon: 'car-sport' },
          { name: 'Vehicle insurance', icon: 'shield' },
          { name: 'Vehicle maintenance', icon: 'build' }
        ]
      },
      {
        name: 'Life & Entertainment',
        type: 'EXPENSE',
        color: '#009688',
        icon: 'game-controller',
        subCategories: [
          { name: 'Sport and fitness', icon: 'fitness' },
          { name: 'Alcohol and tobacco', icon: 'wine' },
          { name: 'Books, audio, subscriptions', icon: 'book' },
          { name: 'Charity and gifts', icon: 'heart' },
          { name: 'Cultural or sport events', icon: 'ticket' },
          { name: 'Education, personal development', icon: 'school' },
          { name: 'Health care', icon: 'medical' },
          { name: 'Hobbies', icon: 'color-palette' },
          { name: 'Holiday, trips, hotels', icon: 'airplane' },
          { name: 'Life events', icon: 'calendar' },
          { name: 'Lottery, gambling', icon: 'dice' },
          { name: 'Wellness, beauty', icon: 'fitness' }
        ]
      },
      {
        name: 'Communication, PC',
        type: 'EXPENSE',
        color: '#00BCD4',
        icon: 'laptop',
        subCategories: [
          { name: 'Internet', icon: 'wifi' },
          { name: 'Postal services', icon: 'mail' },
          { name: 'Software, apps, games', icon: 'apps' },
          { name: 'Telephone, mobile phone', icon: 'call' }
        ]
      },
      {
        name: 'Financial expenses',
        type: 'EXPENSE',
        color: '#FFC107',
        icon: 'card',
        subCategories: [
          { name: 'Advisory', icon: 'people' },
          { name: 'Charges, Fees', icon: 'cash' },
          { name: 'Child Support', icon: 'people' },
          { name: 'Fines', icon: 'alert-circle' },
          { name: 'Insurances', icon: 'shield' },
          { name: 'Loans, interests', icon: 'cash' },
          { name: 'Taxes', icon: 'document-text' }
        ]
      },
      {
        name: 'Investments',
        type: 'EXPENSE',
        color: '#4CAF50',
        icon: 'trending-up',
        subCategories: [
          { name: 'Collections', icon: 'albums' },
          { name: 'Financial investments', icon: 'stats-chart' },
          { name: 'Realty', icon: 'business' },
          { name: 'Savings', icon: 'save' },
          { name: 'Vehicles', icon: 'car' }
        ]
      },
      {
        name: 'Income',
        type: 'INCOME',
        color: '#8BC34A',
        icon: 'cash',
        subCategories: [
          { name: 'Checks, coupons', icon: 'document-text' },
          { name: 'Child Support', icon: 'people' },
          { name: 'Dues & grants', icon: 'cash' },
          { name: 'Gifts', icon: 'gift' },
          { name: 'Interests, dividends', icon: 'trending-up' },
          { name: 'Lending, renting', icon: 'business' },
          { name: 'Lottery, gambling', icon: 'dice' },
          { name: 'Refunds (tax, purchase)', icon: 'return-down-back' },
          { name: 'Rental income', icon: 'home' },
          { name: 'Sale', icon: 'storefront' },
          { name: 'Wage, invoices', icon: 'wallet' }
        ]
      },
      {
        name: 'Others',
        type: 'EXPENSE',
        color: '#607D8B',
        icon: 'ellipsis-horizontal',
        subCategories: [
          { name: 'Other', icon: 'ellipsis-horizontal' }
        ]
      }
    ];

    for (const categoryItem of categoryData) {
      const category = categoryRepository.create({
        name: categoryItem.name,
        type: categoryItem.type as 'EXPENSE' | 'INCOME',
        color: categoryItem.color,
        icon: categoryItem.icon
      });

      await categoryRepository.save(category);

      for (const subCategoryItem of categoryItem.subCategories) {
        const subCategory = subCategoryRepository.create({
          name: subCategoryItem.name,
          icon: subCategoryItem.icon,
          categoryId: category.id
        });

        await subCategoryRepository.save(subCategory);
      }
    }
  }
} 