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
          { name: 'Groceries', icon: 'shopping_basket' },
          { name: 'Restaurant, Cafe, Eating Out', icon: 'restaurant_menu' }
        ]
      },
      {
        name: 'Shopping',
        type: 'EXPENSE',
        color: '#E91E63',
        icon: 'shopping_cart',
        subCategories: [
          { name: 'Clothes & Footwear', icon: 'checkroom' },
          { name: 'Drug-store, chemist', icon: 'local_pharmacy' },
          { name: 'Electronics, accessories', icon: 'devices' },
          { name: 'Gifts, joy', icon: 'card_giftcard' },
          { name: 'Health and beauty', icon: 'spa' },
          { name: 'Home, garden', icon: 'home' },
          { name: 'Jewels, accessories', icon: 'diamond' },
          { name: 'Kids', icon: 'child_care' },
          { name: 'Leisure time', icon: 'sports_esports' },
          { name: 'Pets, animals', icon: 'pets' },
          { name: 'Stationery, tools', icon: 'build' }
        ]
      },
      {
        name: 'Housing',
        type: 'EXPENSE',
        color: '#9C27B0',
        icon: 'house',
        subCategories: [
          { name: 'Energy, utilities', icon: 'power' },
          { name: 'Maintenance, repairs', icon: 'handyman' },
          { name: 'Mortgage', icon: 'account_balance' },
          { name: 'Property insurance', icon: 'security' },
          { name: 'Rent', icon: 'apartment' },
          { name: 'Services', icon: 'miscellaneous_services' }
        ]
      },
      {
        name: 'Transportation',
        type: 'EXPENSE',
        color: '#3F51B5',
        icon: 'directions_car',
        subCategories: [
          { name: 'Business trips', icon: 'business_center' },
          { name: 'Long distance', icon: 'flight' },
          { name: 'Public transport', icon: 'directions_bus' },
          { name: 'Taxi', icon: 'local_taxi' },
          { name: 'Fuel', icon: 'local_gas_station' },
          { name: 'Leasing', icon: 'request_quote' },
          { name: 'Parking', icon: 'local_parking' },
          { name: 'Rentals', icon: 'car_rental' },
          { name: 'Vehicle insurance', icon: 'security' },
          { name: 'Vehicle maintenance', icon: 'build' }
        ]
      },
      {
        name: 'Life & Entertainment',
        type: 'EXPENSE',
        color: '#009688',
        icon: 'sports_esports',
        subCategories: [
          { name: 'Sport and fitness', icon: 'fitness_center' },
          { name: 'Alcohol and tobacco', icon: 'liquor' },
          { name: 'Books, audio, subscriptions', icon: 'menu_book' },
          { name: 'Charity and gifts', icon: 'volunteer_activism' },
          { name: 'Cultural or sport events', icon: 'theater_comedy' },
          { name: 'Education, personal development', icon: 'school' },
          { name: 'Health care', icon: 'medical_services' },
          { name: 'Hobbies', icon: 'palette' },
          { name: 'Holiday, trips, hotels', icon: 'beach_access' },
          { name: 'Life events', icon: 'celebration' },
          { name: 'Lottery, gambling', icon: 'casino' },
          { name: 'Wellness, beauty', icon: 'spa' }
        ]
      },
      {
        name: 'Communication, PC',
        type: 'EXPENSE',
        color: '#00BCD4',
        icon: 'computer',
        subCategories: [
          { name: 'Internet', icon: 'wifi' },
          { name: 'Postal services', icon: 'local_post_office' },
          { name: 'Software, apps, games', icon: 'apps' },
          { name: 'Telephone, mobile phone', icon: 'phone_android' }
        ]
      },
      {
        name: 'Financial expenses',
        type: 'EXPENSE',
        color: '#FFC107',
        icon: 'account_balance',
        subCategories: [
          { name: 'Advisory', icon: 'support_agent' },
          { name: 'Charges, Fees', icon: 'payments' },
          { name: 'Child Support', icon: 'child_care' },
          { name: 'Fines', icon: 'gavel' },
          { name: 'Insurances', icon: 'security' },
          { name: 'Loans, interests', icon: 'credit_score' },
          { name: 'Taxes', icon: 'receipt_long' }
        ]
      },
      {
        name: 'Investments',
        type: 'EXPENSE',
        color: '#4CAF50',
        icon: 'trending_up',
        subCategories: [
          { name: 'Collections', icon: 'collections' },
          { name: 'Financial investments', icon: 'show_chart' },
          { name: 'Realty', icon: 'apartment' },
          { name: 'Savings', icon: 'savings' },
          { name: 'Vehicles', icon: 'directions_car' }
        ]
      },
      {
        name: 'Income',
        type: 'INCOME',
        color: '#8BC34A',
        icon: 'payments',
        subCategories: [
          { name: 'Checks, coupons', icon: 'receipt' },
          { name: 'Child Support', icon: 'child_care' },
          { name: 'Dues & grants', icon: 'price_check' },
          { name: 'Gifts', icon: 'card_giftcard' },
          { name: 'Interests, dividends', icon: 'trending_up' },
          { name: 'Lending, renting', icon: 'real_estate_agent' },
          { name: 'Lottery, gambling', icon: 'casino' },
          { name: 'Refunds (tax, purchase)', icon: 'assignment_return' },
          { name: 'Rental income', icon: 'house' },
          { name: 'Sale', icon: 'store' },
          { name: 'Wage, invoices', icon: 'account_balance_wallet' }
        ]
      },
      {
        name: 'Others',
        type: 'EXPENSE',
        color: '#607D8B',
        icon: 'more_horiz',
        subCategories: [
          { name: 'Other', icon: 'more_horiz' }
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