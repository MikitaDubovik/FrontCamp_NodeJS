let mongoose = require('mongoose');

let NewsShema = new mongoose.Schema({
    urlToImage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    }
})

NewsShema.methods.getInfo = function () {
    return `ID - ${this._id}, Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
}

const News = mongoose.model('News', NewsShema);

exports.News = News;