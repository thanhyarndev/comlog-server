// src/food-item/dto/create-food-item.dto.ts
export class CreateFoodItemDto {
  name: string;
  type: 'main' | 'side';
  price: number;
}

// src/food-item/dto/update-food-item.dto.ts
export class UpdateFoodItemDto {
  name?: string;
  type?: 'main' | 'side';
  price?: number;
}
