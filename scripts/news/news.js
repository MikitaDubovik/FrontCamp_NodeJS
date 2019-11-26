class News {
    constructor(id, author, title, publishedAt) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.publishedAt = publishedAt;
    }

    get() {
        return `ID - ${this.id}, Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
    }
}

exports.News = News;