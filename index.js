require("dotenv").config();
const express =require('express')
const Tutorial = require("./models/tutorial");

const app = express();
app.use(express.json());

app.get("/api/tutorial", (req, res) => {
    Tutorial.find({}).then((toturial) => {
      res.json(toturial);
    });
  });

app.get ('/api/tutorial/:id',(req,res)=>{
    Tutorial.findById(req.params.id).then((toturial) => {
        if(toturial){
            res.json(toturial);
        }else{
            response.status(404).end()
        }
      })
      .catch(error => res.status(400).send({error:'error'}))
});

app.post("/api/tutorial", async (req, res) => {
    const { name = undefined, published = false } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: " missing name" });
    }
  
    const result = await Tutorial.find({ name });
    if (result.length) {
        console.log(result);
  } else {
      const tutorial = new Tutorial({
        name: name,
        published: published
      });
  
      tutorial.save().then((savedTourial) => {
        res.json(savedTourial);
      });
    }
  });

  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
})
