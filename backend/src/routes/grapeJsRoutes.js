const router = require("express").Router();
const GrapeSchema = require("../models/GrapeStuff");

// Post template
router.post("/", async (req, res) => {
  const { html, css, components, styles } = req.body;
  let newGrapeSchema = { html, css, components, styles };
  for (const [key, value] of Object.entries(newGrapeSchema)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });
    }
  }

  try {
    newGrapeSchema = new GrapeSchema(newGrapeSchema);

    const grapeSchema = await newGrapeSchema.save();
    res.status(200).json(grapeSchema);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Template
router.get("/:grapeSchemaId", async (req, res) => {
  try {
    const grapeSchema = await GrapeSchema.findById(req.params.grapeSchemaId);
    res.status(200).json(grapeSchema);
  } catch (err) {
    res.status(404).json("GrapeSchema not found");
  }
});

module.exports = router;
