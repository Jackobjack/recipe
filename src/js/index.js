// require ("@babel/polyfill");
// fetch(url); 
import axios from 'axios';
import Search from './model/search';

// Класс обьет үүсгэв
let search = new Search('pasta');

// Түүн доторх функцийг дуудав
search.doSearch().then(r => console.log(r));





