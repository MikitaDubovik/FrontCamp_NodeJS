class News {
    constructor(news) {
        this.id = news.id;
        this.author = news.author;
        this.title = news.title;
        this.publishedAt = news.publishedAt;
    }

    get() {
        return `ID - ${this.id}, Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
    }
}

exports.News = News;