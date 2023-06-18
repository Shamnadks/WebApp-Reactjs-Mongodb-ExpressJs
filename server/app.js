const express =require('express')
const app=express()
const cors=require('cors')
require('./utils/database')

app.use(express.static( 'public'));

const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')



app.use(cors());
app.use(express.json());


//routes

app.use('/api',userRoutes);
app.use('/api/admin',adminRoutes);




app.listen(9000)
