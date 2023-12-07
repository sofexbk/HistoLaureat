const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    posteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poste', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    content: { type: String, required:function() { return this.isNew ? true : false;} },
    creationDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);