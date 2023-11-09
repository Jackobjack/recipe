import {elements} from "./base";
import { renderLoader } from "./base";

// private function
const renderRecipe = (recipe) => {
    let markup = 
    `<div class='delete__resultsList'>
    <li>
        <a class="results__link" href="${recipe.id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    </div>`;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
}


// Вебээс хайлтын түлхүүр үгийг гаргаж авна
export const getInput = () => elements.searchField.value;

// Хайлтын талбарын түлхүүр үгийг арилгана 
export const clearSearchQuery = () => {
    elements.searchField.value = '';
}

// Хайлтын үр дүнгийн талбарыг цэвэрлэнэ
export const clearSearchResult = () => {
    elements.searchResultsList.innerHTML = '';
}

// Хайлтын үр дүнг дэлгэц дээр харуулна
export const renderRecipes = (recipes) => {
    // recipes.forEach(recipe => renderRecipe(recipe))
    recipes.forEach(renderRecipe);      
}



