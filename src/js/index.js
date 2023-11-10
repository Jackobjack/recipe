import { every } from 'lodash';
import Search from './model/search';
import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';

/** Web app төлөв
* - Хайлтын query, үр дүн
* - Тухайн үзүүлж байгаа жор
* - Лайкалсан жорууд
* - Захиалж байгаа жорын найрлагууд
*/
export const state = {};

const controlSearch = async () => {
    // 1. Вебээс хайлтын түлхүүр үгийг гаргаж авна
    let query = searchView.getInput();

    // 2. Шинээр хайлтын обьектыг үүсгэж өгнө
    if (query){
        state.search = new Search(query);
        
        // 3. Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэж өгнө.
        searchView.clearSearchQuery();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);
    
        // 4. Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
    
        // 5. Хайлтын үр дүнг гүйцэтгэнэ
        clearLoader();
        if (state.search.result === undefined){
            alert('Хайлтаар илэрсэнгүй');
        } else {
            searchView.renderRecipes(state.search.result);
        }
    }
}

elements.searchForum.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.pageButton.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline')
    if (btn){
        // data-goto=${page}
        const gotoPageNumber = parseInt(btn.dataset.goto, 10)
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
    }
})

 // **************************** //

 const controlRecipe = async (id) => {
     // 1. Хайлтын id хувьсагч үүсгэх
     // const id = id;

     // 2. Шинээр хайлтын обьектыг үүсгэж өгнө
     state.recipe = new Recipe(id);
              
/*      // 3. Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэж өгнө.
     Recipe.clearRecipe()
     renderLoader(elements.recipe);

     // 4. Хоолны жорын мэдээллийг авчрах
     await state.recipe.geRecipe();
 
     // 5. Хайлтын үр дүнг харуулна
     clearLoader();
     if (state.recipe.result === undefined){
         alert('Түр зуурын алдаа гарлаа ');
     } else {
         Recipe.renderRecipes(state.recipe.result);
     } */
}

/* elements.searchResultsList.addEventListener('click', e => {
    const recipe_id = e.target.results__name;
    console.log(recipe_id);
    // controlRecipe(recipe_id);
}) */

const r = new Recipe('5ed6604591c37cdc054bcd09');
r.getRecipe();



