let mongoose = require('mongoose');

let NewsShema = new mongoose.Schema({
    author: {
        type: String,
        required: true
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
    return `ID - ${this._id}, Author - ${this.author}, Title - ${this.title}, Published at - ${this.publishedAt} \n`
}

const News = mongoose.model('News', NewsShema);

exports.News = News;