require("dotenv").config();
const express = require("express");
const Tutorial = require("./models/tutorial");

const app = express();
app.use(express.json());

app.get("/api/tutorial", (req, res) => {
  const { title } = req.query;
  if (title) {
    Tutorial.find({ name: { $regex: ".*kw.*" } }).then((filterdTutorials) => {
      res.json(filterdTutorials);
    });
  } else {
    Tutorial.find({}).then((toturial) => {
      res.json(toturial);
    });
  }
});

app.get("/api/tutorial/published", (req, res) => {
  Tutorial.find({ published: true })
    .then((publishedTutorial) => res.json(publishedTutorial))
    .catch((err) => console.log(err));
});

app.get("/api/tutorial/:id", (req, res) => {
  Tutorial.findById(req.params.id)
    .then((toturial) => {
      if (toturial) {
        res.json(toturial);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => res.status(400).send({ error: "error" }));
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
      published: published,
    });

    tutorial.save().then((savedTourial) => {
      res.json(savedTourial);
    });
  }
});

app.put("/api/tutorial/:id", async (req, res) => {
  const { name = undefined, published = false } = req.body;
  const tutorial = {
    name: name,
    published: published,
  };
  try {
    const update = await Tutorial.findByIdAndUpdate(req.params.id, tutorial, {
      new: true,
    });
    res.json(update);
  } catch (err) {
    console.log("error", err);
  }
});

app.delete("/api/tutorial/:id", (req, res) => {
  Tutorial.findByIdAndRemove(req.params.id)
    .then((removeTutorial) =>  res.status(204).send(`${removeTutorial} removed`).end())
    .catch((error) => console.log(error));
});

app.delete("/api/tutorial", (req, res) => {
  Tutorial.deleteMany({})
    .then((removeTutorial) => {
      res.status(204).send("deleted all");
    })
    .catch((error) => console.log(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
