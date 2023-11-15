import uniqid from 'uniqid'; 

// эхлээд хоосон массив үүсгэнэ
export class List {
    constructor() {
        this.items = [];
    }
    addItem(item){
        const newItem = { id : uniqid(), item }
        this.items.push(newItem);
        return newItem;
    }
    deleteItem(id){
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1){
            this.items.splice(index, 1);
        }
        return this.items;
    }
}
