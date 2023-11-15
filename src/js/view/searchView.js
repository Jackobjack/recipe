import {elements} from "./base";

// Вебээс хайлтын түлхүүр үгийг гаргаж авна
export const getInput = () => elements.searchField.value;

// Хайлтын талбарын түлхүүр үгийг арилгана 
export const clearSearchQuery = () => {
    elements.searchField.value = '';
}

// Хайлтын үр дүнгийн талбарыг цэвэрлэнэ
export const clearSearchResult = () => {
    elements.searchResultsList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
}

// private function
const renderRecipe = (recipe) => {
    let markup = 
    `<div class='delete__resultsList'>
    <li>
        <a class="results__link" href="#${recipe.id}">
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

const createButton = (page, type, direction) => (
    `<button class="btn-inline results__btn--${type}" data-goto=${page}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction}"></use>
        </svg>
        <span>Хуудас ${page}</span>
    </button>`);

// Хайлтын үр дүнг дэлгэц дээр харуулна
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 9) => {
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage

    // ceil = 4.2 => 5;     floor = 4.2 => 4 
    const totalPages = Math.ceil(recipes.length / resPerPage);

    // recipes.forEach(recipe => renderRecipe(recipe))
    recipes.slice(start, end).forEach(renderRecipe);  
    
    // type = 'prev', 'next';
    renderButtons(currentPage, totalPages);
}

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if (totalPages === 1){
        buttonHtml = '';
    } else if (currentPage === 1 && totalPages > 1){
        buttonHtml = createButton((currentPage + 1), 'next', 'right');
    } else  if (currentPage < totalPages ){
        buttonHtml = createButton((currentPage - 1), 'prev', 'left');
        buttonHtml += createButton((currentPage + 1), 'next', 'right');
    } else  if (currentPage === totalPages){
        buttonHtml = createButton((currentPage - 1), 'prev', 'left');
    }
    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
}

