let mongoose = require('mongoose');

let NewsShema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    publishedAt: {
        type: Date,
        required: true
    }
})

NewsShema.methods.getInfo = function () {
    return `Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
}

const News = mongoose.model('News', NewsShema);

exports.News = News;