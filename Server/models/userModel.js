const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Schema=mongoose.Schema
const userSchema=new Schema({
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  role: { type: String, enum: ['etudiant', 'laureat','admin'], required: true },
})

userSchema.statics.signup = async function (email, password, confirmPassword, role) {
  if (!email || !password || !confirmPassword || !role) {
    throw Error('Tous les champs doivent être remplis');
  }
  if (role === 'etudiant' && !email.endsWith('@etu.uae.ac.ma')) {
    throw Error('L\'adresse e-mail doit se terminer par "@etu.uae.ac.ma" pour les étudiants.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email n\'est pas valide');
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Le mot de passe pas suffisamment fort');
  // }
  if (password !== confirmPassword) {
    throw Error('Les mots de passe ne correspondent pas');
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email déjà utilisé');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, role });
  return user;
}

userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error('Tous les champs doivent être remplis')
    }
    const user=await this.findOne({ email})
    if(!user){
      throw Error('Email incorrecte ')
    } 
    const match=await bcrypt.compare(password,user.password)
     if(!match){
        throw Error('mot de passe incorrecte')
    }
    return user
}
module.exports=mongoose.model('User',userSchema)