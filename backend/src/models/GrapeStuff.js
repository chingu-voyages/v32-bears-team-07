const mongoose = require("mongoose");

const GrapeSchema = new mongoose.Schema({
  html: {
    type: String,
  },
  css: {
    type: String,
  },
  components: {
    type: Array,
  },
  styles: {
    type: Array,
  },
});

module.exports = mongoose.model("GrapeSchema", GrapeSchema);
