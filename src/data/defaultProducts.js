export const DEFAULT_PRODUCTS = [
  { id: 'p_001', nombre: 'Capuchino', categoria: 'Cafés', precio: 250, stock: 30, icono: 'coffee', activo: true },
  { id: 'p_002', nombre: 'Espresso', categoria: 'Cafés', precio: 180, stock: 40, icono: 'coffee_maker', activo: true },
  { id: 'p_003', nombre: 'Latte Vainilla', categoria: 'Cafés', precio: 280, stock: 25, icono: 'local_cafe', activo: true },
  { id: 'p_004', nombre: 'Americano', categoria: 'Cafés', precio: 200, stock: 35, icono: 'coffee', activo: true },
  { id: 'p_005', nombre: 'Frappé Moca', categoria: 'Cafés', precio: 350, stock: 12, icono: 'icecream', activo: true },

  { id: 'p_006', nombre: 'Jugo de Naranja', categoria: 'Bebidas', precio: 220, stock: 20, icono: 'local_drink', activo: true },
  { id: 'p_007', nombre: 'Refresco Cola', categoria: 'Bebidas', precio: 150, stock: 50, icono: 'sports_bar', activo: true },
  { id: 'p_008', nombre: 'Agua Mineral', categoria: 'Bebidas', precio: 100, stock: 60, icono: 'water_drop', activo: true },
  { id: 'p_009', nombre: 'Té Helado', categoria: 'Bebidas', precio: 180, stock: 8, icono: 'emoji_food_beverage', activo: true },

  { id: 'p_010', nombre: 'Cheesecake', categoria: 'Postres', precio: 320, stock: 10, icono: 'cake', activo: true },
  { id: 'p_011', nombre: 'Brownie', categoria: 'Postres', precio: 260, stock: 15, icono: 'cookie', activo: true },
  { id: 'p_012', nombre: 'Croissant', categoria: 'Postres', precio: 180, stock: 20, icono: 'bakery_dining', activo: true },

  { id: 'p_013', nombre: 'Sandwich Jamón', categoria: 'Sandwiches', precio: 380, stock: 14, icono: 'lunch_dining', activo: true },
  { id: 'p_014', nombre: 'Sandwich Pollo', categoria: 'Sandwiches', precio: 420, stock: 12, icono: 'lunch_dining', activo: true },
  { id: 'p_015', nombre: 'Bagel Queso', categoria: 'Sandwiches', precio: 300, stock: 0, icono: 'breakfast_dining', activo: true },

  { id: 'p_016', nombre: 'Papas Fritas', categoria: 'Otros', precio: 200, stock: 25, icono: 'fastfood', activo: true },
  { id: 'p_017', nombre: 'Galletas', categoria: 'Otros', precio: 120, stock: 40, icono: 'cookie', activo: true }
];

export const CATEGORIES = ['Cafés', 'Bebidas', 'Postres', 'Sandwiches', 'Otros'];

export const ICON_OPTIONS = [
  'coffee', 'coffee_maker', 'local_cafe', 'icecream', 'cake', 'cookie',
  'bakery_dining', 'breakfast_dining', 'lunch_dining', 'fastfood',
  'local_drink', 'sports_bar', 'water_drop', 'emoji_food_beverage',
  'restaurant', 'ramen_dining', 'local_pizza', 'liquor'
];
