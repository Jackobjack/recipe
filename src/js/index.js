import "@babel/polyfill";
import axios from "axios";
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { clearRecipe, renderRecipe, highlightSelectedRecipe }  from './view/recipeView';
import  { List, addItem, deleteItem } from './model/List'; 
import * as listView from './view/listView'
import Likes from './model/Like';
import * as likeView from './view/likeView'


/**
 * Web app төлөв
 * - Хайлтын query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - Лайкласан жорууд
 * - Захиалж байгаа жорын найрлаганууд
 */
const state = {};


/* 
*  Хайлтын контроллер 
*/
const controlSearch = async () => {
  // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();

  // Ямар нэг хайлт байгаа эсэхийг шалгах
  if (query) {
    // 2) Шинээр хайлтын обьектийг үүсгэж өгнө.
    state.search = new Search(query);

    // 3) Хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);

    // 4) Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();

    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};


elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});


elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});


/* 
*  Жорын контроллер 
*/
const controlRecipe = async () => {
  // 1. Жорын индекс id-г олох
  const id = window.location.hash.replace('#', '');
 

  // URL-дээр ID байгаа эсэхийг шалгах
  if (id){
    // 2. Жорын шинэ обьект үүсгэх
    state.recipe = new Recipe(id);
    
    // 3. Жорын талбарыг цэвэрлэх
    clearRecipe();
    renderLoader(elements.recipeDiv);
    highlightSelectedRecipe(id);
  
    // 4. Жорыг хайж олох
    await state.recipe.getRecipe();
  
    // 5. Жорын гүйцэтгэх хугацаа болон орцыг тооцоолох
    // state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    
    // 6. Жорыг дэлгэцэнд үзүүлэх
    clearLoader();
    if (state.recipe === 'undefined'){
      alert('Жорын мэдээлэл олдсонгүй')
    } else {
      renderRecipe(state.recipe, state.likes.isLiked(id));
    }
  } 
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
window.addEventListener('load', el => {
  // Шинээр лайк моделийг апп дөнгөж ачаалагдахад үүсгэнэ
  if (!state.likes) state.likes = new Likes();

  // LikeHeart - алга болгов
  likeView.toggleLikeMenu(state.likes.getNumberOfLikes);

  // Лайкууд байвал тэрийг цэсэнд нэмж харуулна
  state.likes.likes.forEach(like => likeView.renderLike(like));
})

/* 
*  Найрлаганы контроллер 
*/
const controlList = () => {
    // 1. Найрлагын обьект моделийг үүсгэнэ
    state.list = new List();
    
    // 2. Найрлагын талбарыг цэвэрлэх
    listView.clearItems();
  
    // 3. Жорыг дэлгэцэнд үзүүлэх
    state.recipe.ingredients.forEach(el => {
      // тухайн найрлагыг модельруу хийнэ
      const newItem = state.list.addItem(el);

      //тухайн найрлагыг дэлгэцэнд гаргана
      listView.renderItem(newItem);
    });
};
// Сагсанд хийх товчин дээр дарвал controlList ажиллана
elements.recipeDiv.addEventListener('click', (event) => {
  if (event.target.matches('.recipe__btn, .recipe__btn *')){
    controlList();
  } else if (event.target.matches('.recipe__love, .recipe__love *')){
    controlLike();
  }
})


// Сагснаас хэрэггүй орцыг устгах 
elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  
  if (id) {
    // Олдсон ийм ID-тай орцыг моделоос устгах
    state.list.deleteItem(id);
    
    // Дэлгэцээс ийм ID-тай орцыг олж бас устгах
    listView.deleteItem(id);
  }
})


/* 
*  Like контроллер 
*/
const controlLike = () => {
    // 1. Хоосон бол харагдаж буй жорыг авч моделруу хийх
    if (!state.likes){
      state.likes = new Likes();
    } 

    // 2. Одоо харагдаж байгаа жорын ID-г олж авах
    const currentRecipeId = state.recipe.id;
    
    // 3. Жорыг лайкалсан эсэхийг шалгах
    if (state.likes.isLiked(currentRecipeId)){
      // Лайк хийсэн байна
      likeView.toggleLikeButton(false);
      state.likes.deleteLike(currentRecipeId);
      likeView.deleteLike(currentRecipeId);
      
    } else {
      // Лайк хийгээгүй байна
      likeView.toggleLikeButton(true);
      const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url, state.recipe.source_url);
      likeView.renderLike(newLike);
    }
    
    // 4. Хичнээн жор байгааг мэдэх
    likeView.toggleLikeMenu(state.likes.getNumberOfLikes());
  }
