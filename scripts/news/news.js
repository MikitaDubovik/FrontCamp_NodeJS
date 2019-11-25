class News{
    constructor(){
        this.id = Math.random();
        this.author = "author";
        this.title = "title";
        this.publishedAt = Date.now();
    }

    get(){
        return `ID - ${this.id}, Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
    }
}

exports.News = News;