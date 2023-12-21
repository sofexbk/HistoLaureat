const mongoose = require('mongoose');

const posteSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    title: { type: String,  required: function() { return this.isNew ? true : false;}},
    //image: { Buffer: String }, 
    content: { type: String, required: function() { return this.isNew ? true : false;} },
    creationDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Poste', posteSchema);
