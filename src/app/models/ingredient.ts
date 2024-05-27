import { Flavor } from "./flavor";

export interface Ingredient {
    id: string;
    brand: string;
    weight: string;
    servingSize: string;
    serving: string;
    calories: string;
    ingredientList: string;
    proteinPerServing: string;
    origin: string;
    flavors: Flavor[];
}