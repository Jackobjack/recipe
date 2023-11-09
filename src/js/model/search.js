import axios from "axios";

// файлаас ганцхан зүйлийг export хийдэг бол default угтвар бичнэ
export default class Search {
    constructor(query){
        this.query = query;
    }
    async doSearch(){
        try {
            let result = await axios('https://forkify-api.herokuapp.com/api/v2/recipes?search=' + this.query);
            this.result = result.data.data.recipes;
            return this.result;

        } catch(error) {
            console.log('Асуудал гарлаа : ' + error)
        }
    }
}



