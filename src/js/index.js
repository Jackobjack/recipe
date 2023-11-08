// require ("@babel/polyfill");
import Search from './model/search';

/** Web app төлөв
* - Хайлтын query, үр дүн
* - Тухайн үзүүлж байгаа жор
* - Лайкалсан жорууд
* - Захиалж байгаа жорын найрлагууд
*/
const state = {};

const controlSearch = async () => {
    // 1. Вебээс хайлтын түлхүүр үгийг гаргаж авна
    const query = 'pizza';
    // query = document.querySelector('.search__field').value

    // 2. Шинээр хайлтын обьектыг үүсгэж өгнө
    if (query){
        state.search = new Search(query);
        
        // 3. Хайлт хийхэд зориулж дэлгэцийн UI бэлтгэж өгнө.

    
        // 4. Хайлтыг гүйцэтгэнэ
        await state.search.doSearch();
    
        // 5. Хайлтын үр дүнг гүйцэтгэнэ
        console.log(state.search.result);
        // const html = '';
        // document.querySelector('.').classList.add('beforeend', html);  
    }
    


    
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})



