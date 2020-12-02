import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
    .then(db => console.log("Conected sucsesfully"))
    .catch(err => console.log(err))