const mongoose=require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    filiere: { type: String, required: true },
    niveau: { type: String, required: function () { return this.role === 'etudiant'; } },
    experiences: { type: String, required: function () { return this.role === 'etudiant'; } },
    posteActuel: { type: String, required: function () { return this.role === 'laureat'; } },
    experiencesPassee: { type: String, required: function () { return this.role === 'laureat'; } },
    promotion:{ type: String, required: function () { return this.role === 'laureat'; } },
  });
  
  module.exports = mongoose.model('Profile', profileSchema);
  