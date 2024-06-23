export class ProductDTO {
    name: string;
    price: number;
    categoryName: string;
    quantity: number;
    brand: string;
    weight: string;
    servingSize: string;
    serving: string;
    calories: string;
    ingredientList: string;
    proteinPerServing: string;
    origin: string;
    flavors: string;
    introduction: string;
    instruction: string;
    advantage: string;
    warning: string;
    images?: File[];
    constructor(productDTO: any) {
        this.name = productDTO.name;
        this.price = productDTO.price;
        this.categoryName = productDTO.categoryName;
        this.quantity = productDTO.quantity;
        this.brand = productDTO.brand;
        this.weight = productDTO.weight;
        this.servingSize = productDTO.servingSize;
        this.serving = productDTO.serving;
        this.calories = productDTO.calories;
        this.ingredientList = productDTO.ingredientList;
        this.proteinPerServing = productDTO.proteinPerServing;
        this.origin = productDTO.origin;
        this.flavors = productDTO.flavors;
        this.introduction = productDTO.introduction;
        this.instruction = productDTO.instruction;
        this.advantage = productDTO.advantage;
        this.warning = productDTO.warning;
        this.images = productDTO.images;
    }
}