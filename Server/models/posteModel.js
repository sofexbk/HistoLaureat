const mongoose = require('mongoose');

const posteSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    title: { type: String,  required: function() { return this.isNew ? true : false;}},
    content: { type: String, required: function() { return this.isNew ? true : false;} },
    creationDate: { type: Date, default: Date.now, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

});

module.exports = mongoose.model('Poste', posteSchema);
