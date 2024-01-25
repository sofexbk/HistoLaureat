require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const userRoutes=require('./routes/userRoute')
const profileRoutes=require('./routes/profileRoute')
const stageRoutes=require('./routes/stageRoute')
const commentRoutes=require('./routes/commentRoute')
const posteRoutes=require('./routes/posteRoute')
const adminRoutes=require('./routes/adminRoute')
const path=require('path')
const ur=require('./controllers/userController')
const app=express()

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const router = express.Router(); 

router.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req,res,next)=>{ 
    console.log(req.path,req.method)
    next()
});
app.use(express.static("uploads"));



app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/stageLaureat',stageRoutes)
app.use('/api/comment',commentRoutes)
app.use('/api/poste',posteRoutes)
//ur.createAdminUser();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected To db && listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
});