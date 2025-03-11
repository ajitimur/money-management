import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIconValue1741662524797 implements MigrationInterface {
   // Map of old icon names to new Ionicons names
   private iconMapping = {
    // Category icons
    'restaurant': 'restaurant',
    'shopping_cart': 'cart',
    'house': 'home',
    'directions_car': 'car',
    'sports_esports': 'game-controller',
    'computer': 'laptop',
    'account_balance': 'card',
    'trending_up': 'trending-up',
    'more_horiz': 'ellipsis-horizontal',
    
    // SubCategory icons
    'shopping_basket': 'basket',
    'restaurant_menu': 'restaurant',
    'checkroom': 'shirt',
    'local_pharmacy': 'medkit',
    'devices': 'hardware-chip',
    'card_giftcard': 'gift',
    'spa': 'fitness',
    'home': 'home',
    'diamond': 'diamond',
    'child_care': 'people',
    'pets': 'paw',
    'build': 'build',
    'power': 'flash',
    'handyman': 'hammer',
    'security': 'shield',
    'apartment': 'business',
    'miscellaneous_services': 'construct',
    'business_center': 'briefcase',
    'flight': 'airplane',
    'directions_bus': 'bus',
    'local_taxi': 'car',
    'local_gas_station': 'flame',
    'request_quote': 'card',
    'local_parking': 'car',
    'car_rental': 'car-sport',
    'fitness_center': 'fitness',
    'liquor': 'wine',
    'menu_book': 'book',
    'volunteer_activism': 'heart',
    'theater_comedy': 'ticket',
    'school': 'school',
    'medical_services': 'medical',
    'palette': 'color-palette',
    'beach_access': 'airplane',
    'celebration': 'calendar',
    'casino': 'dice',
    'wifi': 'wifi',
    'local_post_office': 'mail',
    'apps': 'apps',
    'phone_android': 'call',
    'support_agent': 'people',
    'payments': 'cash',
    'gavel': 'alert-circle',
    'credit_score': 'cash',
    'receipt_long': 'document-text',
    'collections': 'albums',
    'show_chart': 'stats-chart',
    'savings': 'save',
    'receipt': 'document-text',
    'price_check': 'cash',
    'real_estate_agent': 'business',
    'assignment_return': 'return-down-back',
    'store': 'storefront',
    'account_balance_wallet': 'wallet'
  };

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update Category icons
    for (const [oldIcon, newIcon] of Object.entries(this.iconMapping)) {
      await queryRunner.query(`
        UPDATE categories 
        SET icon = '${newIcon}' 
        WHERE icon = '${oldIcon}'
      `);
    }

      // Update SubCategory icons
      for (const [oldIcon, newIcon] of Object.entries(this.iconMapping)) {
        await queryRunner.query(`
          UPDATE sub_categories 
          SET icon = '${newIcon}' 
          WHERE icon = '${oldIcon}'
        `);
      }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       // If needed, you can implement a rollback strategy here
    // This would map the new icons back to the old ones
    const reverseMapping = Object.entries(this.iconMapping).reduce(
      (acc, [oldIcon, newIcon]) => {
        acc[newIcon] = oldIcon;
        return acc;
      },
      {} as Record<string, string>
    );

    // Rollback Category icons
    for (const [newIcon, oldIcon] of Object.entries(reverseMapping)) {
      await queryRunner.query(`
        UPDATE categories 
        SET icon = '${oldIcon}' 
        WHERE icon = '${newIcon}'
      `);
    }

    // Rollback SubCategory icons
    for (const [newIcon, oldIcon] of Object.entries(reverseMapping)) {
      await queryRunner.query(`
        UPDATE sub_categories 
        SET icon = '${oldIcon}' 
        WHERE icon = '${newIcon}'
      `);
    }
    }

}
