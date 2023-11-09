// require ("@babel/polyfill");
import Search from './model/search';
import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';

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
            // alert('Хайлтаар илэрсэнгүй');
        } else {
            searchView.renderRecipes(state.search.result);
        }

        // 6. Хайлтын талбарыг цэвэрлэх
        
        
    }
}

elements.searchForum.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})



