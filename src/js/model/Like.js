import { takeWhile } from "lodash";

export default class Likes {
    constructor(){
        this.readDataFromLocalStorage();
        if (!this.likes) this.likes = [];
    }
    addLike(id, title, publisher, image_url, source_url){
        const like = {id, title, publisher, image_url, source_url};
        this.likes.push(like);
        // Браузерын локал хайрцганд хадгална
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id){
        const index = this.likes.findIndex(like => like.id === id);
        this.likes.splice(index, 1);
        this.saveDataToLocalStorage();
    }
    isLiked(id){
        if (this.likes.findIndex(like => like.id === id) === -1){
            return false; 
        } else {
            return true; 
        }
        // return this.likes.findIndex(like => like.id === id) !== -1; 
    }
    getNumberOfLikes(){
        return this.likes.length;
    }
    saveDataToLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }
}