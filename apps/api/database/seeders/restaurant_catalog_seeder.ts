import { BaseSeeder } from '@adonisjs/lucid/seeders';
import MenuItem from '#models/menu_item';
import MenuItemOption from '#models/menu_item_option';
import MenuItemOptionGroup from '#models/menu_item_option_group';
import MenuItemVariant from '#models/menu_item_variant';
import ProductCategory from '#models/product_category';
import Restaurant from '#models/restaurant';
import {
  MENU_ITEM_TYPES,
  RESTAURANT_STATUSES,
  type MenuItemType,
} from '../../app/types/commerce.ts';

type VariantSeed = {
  name: string;
  sku?: string;
  priceCents: number;
  calories?: number;
  isDefault?: boolean;
};

type OptionSeed = {
  name: string;
  priceCents?: number;
  calories?: number;
};

type OptionGroupSeed = {
  name: string;
  minSelected?: number;
  maxSelected?: number;
  isRequired?: boolean;
  options: OptionSeed[];
};

type MenuItemSeed = {
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  type: MenuItemType;
  imageUrl: string;
  basePriceCents: number;
  taxRateBps?: number;
  calories?: number;
  isFeatured?: boolean;
  variants?: VariantSeed[];
  optionGroups?: OptionGroupSeed[];
};

const categories = [
  {
    name: 'Menus',
    slug: 'menus',
    description: 'Formules avec burger, accompagnement et boisson.',
  },
  {
    name: 'Burgers',
    slug: 'burgers',
    description: 'Burgers gourmands prepares a la commande.',
  },
  {
    name: 'Sides',
    slug: 'sides',
    description: 'Frites, potatoes et petites faims.',
  },
  {
    name: 'Boissons',
    slug: 'drinks',
    description: 'Softs, eaux et boissons fraiches.',
  },
  {
    name: 'Desserts',
    slug: 'desserts',
    description: 'La touche sucree pour finir.',
  },
  {
    name: 'Sauces',
    slug: 'sauces',
    description: 'Sauces en supplement.',
  },
];

const drinkOptions = [
  { name: 'Cola 40cl' },
  { name: 'Cola zero 40cl' },
  { name: 'The glace peche 40cl' },
  { name: 'Eau plate 50cl' },
];

const sideOptions = [
  { name: 'Frites classiques' },
  { name: 'Potatoes paprika', priceCents: 50 },
  { name: 'Onion rings x6', priceCents: 120 },
];

const sauceOptions = [
  { name: 'Ketchup' },
  { name: 'Mayonnaise' },
  { name: 'Barbecue smoky', priceCents: 30 },
  { name: 'Spicy house', priceCents: 30 },
];

const burgerExtras = [
  { name: 'Cheddar supplementaire', priceCents: 80, calories: 80 },
  { name: 'Bacon croustillant', priceCents: 120, calories: 140 },
  { name: 'Steak supplementaire', priceCents: 250, calories: 260 },
  { name: 'Oignons frits', priceCents: 60, calories: 70 },
];

const menuItems: MenuItemSeed[] = [
  {
    categorySlug: 'menus',
    name: 'Menu King Smash',
    slug: 'menu-king-smash',
    description: 'Burger smash double cheddar, frites et boisson au choix.',
    type: MENU_ITEM_TYPES.MEAL,
    imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5',
    basePriceCents: 1190,
    calories: 1120,
    isFeatured: true,
    variants: [
      {
        name: 'Normal',
        sku: 'MENU-KING-SMASH',
        priceCents: 1190,
        calories: 1120,
        isDefault: true,
      },
      {
        name: 'XL',
        sku: 'MENU-KING-SMASH-XL',
        priceCents: 1390,
        calories: 1360,
      },
    ],
    optionGroups: [
      {
        name: 'Accompagnement',
        minSelected: 1,
        maxSelected: 1,
        isRequired: true,
        options: sideOptions,
      },
      {
        name: 'Boisson',
        minSelected: 1,
        maxSelected: 1,
        isRequired: true,
        options: drinkOptions,
      },
      {
        name: 'Sauces',
        maxSelected: 2,
        options: sauceOptions,
      },
    ],
  },
  {
    categorySlug: 'menus',
    name: 'Menu Chicken Crunch',
    slug: 'menu-chicken-crunch',
    description: 'Burger poulet croustillant, accompagnement et boisson.',
    type: MENU_ITEM_TYPES.MEAL,
    imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086',
    basePriceCents: 1090,
    calories: 980,
    isFeatured: true,
    variants: [
      {
        name: 'Normal',
        sku: 'MENU-CHICKEN-CRUNCH',
        priceCents: 1090,
        calories: 980,
        isDefault: true,
      },
      {
        name: 'XL',
        sku: 'MENU-CHICKEN-CRUNCH-XL',
        priceCents: 1290,
        calories: 1200,
      },
    ],
    optionGroups: [
      {
        name: 'Accompagnement',
        minSelected: 1,
        maxSelected: 1,
        isRequired: true,
        options: sideOptions,
      },
      {
        name: 'Boisson',
        minSelected: 1,
        maxSelected: 1,
        isRequired: true,
        options: drinkOptions,
      },
      {
        name: 'Sauces',
        maxSelected: 2,
        options: sauceOptions,
      },
    ],
  },
  {
    categorySlug: 'burgers',
    name: 'King Smash',
    slug: 'king-smash',
    description:
      'Pain brioche, double steak smash, cheddar, pickles et sauce maison.',
    type: MENU_ITEM_TYPES.PRODUCT,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    basePriceCents: 790,
    calories: 760,
    isFeatured: true,
    variants: [
      {
        name: 'Simple',
        sku: 'KING-SMASH-SIMPLE',
        priceCents: 790,
        calories: 760,
        isDefault: true,
      },
      {
        name: 'Triple',
        sku: 'KING-SMASH-TRIPLE',
        priceCents: 990,
        calories: 1010,
      },
    ],
    optionGroups: [
      {
        name: 'Extras',
        maxSelected: 3,
        options: burgerExtras,
      },
      {
        name: 'Retirer ingredients',
        maxSelected: 4,
        options: [
          { name: 'Sans pickles' },
          { name: 'Sans oignons' },
          { name: 'Sans salade' },
          { name: 'Sans sauce' },
        ],
      },
    ],
  },
  {
    categorySlug: 'burgers',
    name: 'Chicken Crunch',
    slug: 'chicken-crunch',
    description:
      'Filet de poulet croustillant, salade, tomate et sauce pepper.',
    type: MENU_ITEM_TYPES.PRODUCT,
    imageUrl: 'https://images.unsplash.com/photo-1615297928064-24977384d0da',
    basePriceCents: 740,
    calories: 690,
    variants: [
      {
        name: 'Classique',
        sku: 'CHICKEN-CRUNCH',
        priceCents: 740,
        calories: 690,
        isDefault: true,
      },
      {
        name: 'Spicy',
        sku: 'CHICKEN-CRUNCH-SPICY',
        priceCents: 790,
        calories: 720,
      },
    ],
    optionGroups: [
      {
        name: 'Extras',
        maxSelected: 3,
        options: burgerExtras.filter(
          (extra) => extra.name !== 'Steak supplementaire',
        ),
      },
    ],
  },
  {
    categorySlug: 'burgers',
    name: 'Veggie Melt',
    slug: 'veggie-melt',
    description:
      'Galette veggie grillee, cheddar, oignons confits et sauce barbecue.',
    type: MENU_ITEM_TYPES.PRODUCT,
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    basePriceCents: 720,
    calories: 650,
    variants: [
      {
        name: 'Classique',
        sku: 'VEGGIE-MELT',
        priceCents: 720,
        calories: 650,
        isDefault: true,
      },
    ],
    optionGroups: [
      {
        name: 'Extras',
        maxSelected: 3,
        options: [
          { name: 'Cheddar supplementaire', priceCents: 80, calories: 80 },
          { name: 'Oignons frits', priceCents: 60, calories: 70 },
          {
            name: 'Galette veggie supplementaire',
            priceCents: 220,
            calories: 230,
          },
        ],
      },
    ],
  },
  {
    categorySlug: 'sides',
    name: 'Frites classiques',
    slug: 'frites-classiques',
    description: 'Frites dorees et salees juste comme il faut.',
    type: MENU_ITEM_TYPES.SIDE,
    imageUrl: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d',
    basePriceCents: 320,
    calories: 380,
    variants: [
      {
        name: 'Moyenne',
        sku: 'FRITES-M',
        priceCents: 320,
        calories: 380,
        isDefault: true,
      },
      { name: 'Grande', sku: 'FRITES-L', priceCents: 420, calories: 520 },
    ],
    optionGroups: [
      {
        name: 'Sauces',
        maxSelected: 2,
        options: sauceOptions,
      },
    ],
  },
  {
    categorySlug: 'sides',
    name: 'Onion rings',
    slug: 'onion-rings',
    description: "Anneaux d'oignons croustillants.",
    type: MENU_ITEM_TYPES.SIDE,
    imageUrl: 'https://images.unsplash.com/photo-1639024471283-03518883512d',
    basePriceCents: 390,
    calories: 430,
    variants: [
      {
        name: 'x6',
        sku: 'ONION-RINGS-6',
        priceCents: 390,
        calories: 430,
        isDefault: true,
      },
      { name: 'x9', sku: 'ONION-RINGS-9', priceCents: 520, calories: 620 },
    ],
  },
  {
    categorySlug: 'drinks',
    name: 'Cola',
    slug: 'cola',
    description: 'Boisson gazeuse fraiche.',
    type: MENU_ITEM_TYPES.DRINK,
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97',
    basePriceCents: 250,
    calories: 160,
    variants: [
      {
        name: '40cl',
        sku: 'COLA-40',
        priceCents: 250,
        calories: 160,
        isDefault: true,
      },
      { name: '50cl', sku: 'COLA-50', priceCents: 300, calories: 210 },
    ],
  },
  {
    categorySlug: 'desserts',
    name: 'Cookie chocolat',
    slug: 'cookie-chocolat',
    description: 'Cookie moelleux aux pepites de chocolat.',
    type: MENU_ITEM_TYPES.DESSERT,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    basePriceCents: 290,
    calories: 360,
  },
  {
    categorySlug: 'sauces',
    name: 'Sauce barbecue smoky',
    slug: 'sauce-barbecue-smoky',
    description: 'Sauce barbecue fumee en pot individuel.',
    type: MENU_ITEM_TYPES.PRODUCT,
    imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc',
    basePriceCents: 50,
    calories: 45,
  },
];

export default class RestaurantCatalogSeeder extends BaseSeeder {
  async run() {
    const restaurant = await Restaurant.updateOrCreate(
      { slug: 'burger-station' },
      {
        name: 'Burger Station',
        slug: 'burger-station',
        description:
          'Fast-food urbain specialise dans les burgers, menus et sides croustillants.',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        phone: '+33102030405',
        email: 'hello@burger-station.test',
        addressLine1: '12 Avenue des Burgers',
        addressLine2: null,
        city: 'Paris',
        postalCode: '75011',
        country: 'FR',
        latitude: 48.8566,
        longitude: 2.3522,
        openingHours: JSON.stringify({
          monday: ['11:00-23:00'],
          tuesday: ['11:00-23:00'],
          wednesday: ['11:00-23:00'],
          thursday: ['11:00-23:00'],
          friday: ['11:00-00:00'],
          saturday: ['11:00-00:00'],
          sunday: ['12:00-22:30'],
        }),
        deliveryRadiusMeters: 4500,
        minimumOrderCents: 1000,
        status: RESTAURANT_STATUSES.OPEN,
      },
    );

    const categoriesBySlug = new Map<string, ProductCategory>();

    for (const [index, categorySeed] of categories.entries()) {
      const category = await ProductCategory.updateOrCreate(
        { restaurantId: restaurant.id, slug: categorySeed.slug },
        {
          restaurantId: restaurant.id,
          ...categorySeed,
          displayOrder: index + 1,
          isActive: true,
        },
      );

      categoriesBySlug.set(category.slug, category);
    }

    for (const [index, itemSeed] of menuItems.entries()) {
      const category = categoriesBySlug.get(itemSeed.categorySlug);

      if (!category) {
        throw new Error(`Category "${itemSeed.categorySlug}" was not seeded`);
      }

      const item = await MenuItem.updateOrCreate(
        { restaurantId: restaurant.id, slug: itemSeed.slug },
        {
          restaurantId: restaurant.id,
          categoryId: category.id,
          name: itemSeed.name,
          slug: itemSeed.slug,
          description: itemSeed.description,
          type: itemSeed.type,
          imageUrl: itemSeed.imageUrl,
          basePriceCents: itemSeed.basePriceCents,
          taxRateBps: itemSeed.taxRateBps ?? 1000,
          calories: itemSeed.calories ?? null,
          isFeatured: itemSeed.isFeatured ?? false,
          isAvailable: true,
          displayOrder: index + 1,
        },
      );

      await this.seedVariants(item, itemSeed.variants);
      await this.seedOptionGroups(item, itemSeed.optionGroups);
    }
  }

  private async seedVariants(item: MenuItem, variants: VariantSeed[] = []) {
    if (variants.length === 0) return;

    for (const [index, variantSeed] of variants.entries()) {
      await MenuItemVariant.updateOrCreate(
        { menuItemId: item.id, name: variantSeed.name },
        {
          menuItemId: item.id,
          name: variantSeed.name,
          sku: variantSeed.sku ?? null,
          priceCents: variantSeed.priceCents,
          calories: variantSeed.calories ?? null,
          isDefault: variantSeed.isDefault ?? index === 0,
          isAvailable: true,
          displayOrder: index + 1,
        },
      );
    }
  }

  private async seedOptionGroups(
    item: MenuItem,
    optionGroups: OptionGroupSeed[] = [],
  ) {
    for (const [groupIndex, groupSeed] of optionGroups.entries()) {
      const group = await MenuItemOptionGroup.updateOrCreate(
        { menuItemId: item.id, name: groupSeed.name },
        {
          menuItemId: item.id,
          name: groupSeed.name,
          minSelected: groupSeed.minSelected ?? 0,
          maxSelected: groupSeed.maxSelected ?? 1,
          isRequired: groupSeed.isRequired ?? false,
          displayOrder: groupIndex + 1,
        },
      );

      for (const [optionIndex, optionSeed] of groupSeed.options.entries()) {
        await MenuItemOption.updateOrCreate(
          { optionGroupId: group.id, name: optionSeed.name },
          {
            optionGroupId: group.id,
            name: optionSeed.name,
            priceCents: optionSeed.priceCents ?? 0,
            calories: optionSeed.calories ?? null,
            isAvailable: true,
            displayOrder: optionIndex + 1,
          },
        );
      }
    }
  }
}
