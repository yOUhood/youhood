const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eskudo = require("../data/eskudos.json");

const kudosSchema = new Schema(
  {
    eskudo: {
      type: [
        {
          type: String,
          required: "Please select one",
          enum: Object.keys(eskudo),
        },
      ],
      default: [],
    },
    message: {
      type: String,
      required: "Add a message",
    },
    recipient: {
      type: String,
      required: "Who are you sending this to?",
    },
    sender: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kudos = mongoose.model("Kudos", kudosSchema);
module.exports = Kudos;
