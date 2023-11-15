import axios from "axios";

export default class Recipe {
        constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const result = await axios('https://forkify-api.herokuapp.com/api/v2/recipes/' + this.id);
            this.cooking_time = result.data.data.recipe.cooking_time;
            this.id = result.data.data.recipe.id;
            this.image_url = result.data.data.recipe.image_url;
            this.publisher = result.data.data.recipe.publisher;
            this.servings = result.data.data.recipe.servings;
            this.source_url = result.data.data.recipe.source_url;
            this.title = result.data.data.recipe.title;
            this.ingredients = result.data.data.recipe.ingredients;              
        } catch (error) {
            alert('Түр зуурын алдаа гарлаа')
        }
    }
    calcTimeCooking (){
        const hour = Math.floor(this.cooking_time / 60)  
        const minute = this.cooking_time - (hour * 60) 
        this.cooking_time = `${hour} цаг ${minute} минут`;      
    }
    calcTime(){
        // Найрлага бүрт ойролцоогоор 5 минут зарцуулна
        this.time = this.ingredients.length * 5; 
    }
    calcHuniiToo(){
        // Хүний тоо
        this.huniiToo = 4;
    }
 }

