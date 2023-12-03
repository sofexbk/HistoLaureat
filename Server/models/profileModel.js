const mongoose=require('mongoose')

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    filiere: { type: String, required: true },
    niveau: { type: String, required: function () { return this.role === 'etudiant'; } },
    role: { type: String, enum: ['etudiant', 'laureat'], required: true },
    experiences: { type: String, required: function () { return this.role === 'etudiant'; } },
    posteActuel: { type: String, required: function () { return this.role === 'laureat'; } },
    experiencesPassee: { type: String, required: function () { return this.role === 'laureat'; } },
  });
  
  module.exports = mongoose.model('Profile', profileSchema);