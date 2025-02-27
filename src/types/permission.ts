export enum Permission {
  // User permissions
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',

  // Category permissions
  CREATE_CATEGORY = 'create:category',
  READ_CATEGORY = 'read:category',
  UPDATE_CATEGORY = 'update:category',
  DELETE_CATEGORY = 'delete:category',

  // SubCategory permissions
  CREATE_SUBCATEGORY = 'create:subcategory',
  READ_SUBCATEGORY = 'read:subcategory',
  UPDATE_SUBCATEGORY = 'update:subcategory',
  DELETE_SUBCATEGORY = 'delete:subcategory',

  // Transaction permissions
  CREATE_TRANSACTION = 'create:transaction',
  READ_TRANSACTION = 'read:transaction',
  UPDATE_TRANSACTION = 'update:transaction',
  DELETE_TRANSACTION = 'delete:transaction',

  // Role permissions
  MANAGE_ROLES = 'manage:roles'
} 