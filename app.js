//requiring imp modules
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

//using all the libraries
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

//database declaration and setup

mongoose.connect(
'mongodb://localhost:27017/wikiDB'
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const wikiSchema = {
    title:String,
    content:String
}

const Article = mongoose.model('Article',wikiSchema);

app.route('/articles')
   .get( (req, res) => {

    Article.find({},function(err,result) {
        if(!err){
        res.send(result);
        }else{
            res.send(err);
        }    
    })
})
    .post(function(req,res) {
   
        const newArt = new Article({
            title:req.body.title,
            content:req.body.content
        })
        newArt.save(function(err){
            if(!err){
                res.send('Noice')
            }else{
                res.send(err)
            }
        })
        
    })
    .delete(function(req,res){
        Article.deleteMany({},function(err){
            if(!err){
                res.send('very noice')
            }else{
                res.send(err)
            }
        })
    })
//////////////////////////////////Request to specific Article/////////////////////////////
app.route('/articles/:topic')
    .get((req,res)=>{
       const articleT = req.params.topic;
       Article.findOne({title:articleT},function(err,result){
           if(!err){
               res.send(result)
           } else{
               res.send(err)
           }
       })

    })
    .put(function(req,res){
        const articlev = req.params.topic;
        Article.update(
            {title:articlev},
            {title:req.body.title,content:req.body.content},
            {overwrite:1},
            function(err){
                if(!err){
                    res.send('Takk , Noice')
                }

            }
            
            )
    })
    .patch(function(req,res){
        const articlep = req.params.topic;
        Article.update(
            {title:articlep},
            {$set:req.body},
            function(err) {
                res.send('NOICE NOICE NOICE NOICE')
            }
        )
    })
    .delete(function(req,res){
        const articless = req.params.topic;
        Article.deleteOne(
            {title:articless},
            function(err) {
                if(!err){
                    res.send('Ek bar noice')
                }
            }
            )
    })


app.listen(3000, () => {
    console.log(`Server started on port`);
});