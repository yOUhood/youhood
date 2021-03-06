const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eskudo = require("../data/eskudos.json");

const kudosSchema = new Schema(
  {
    eskudo: {
      type: String,
      required: "Please select one",
      enum: Object.keys(eskudo),
      default: ""
    },
    message: {
      type: String,
      required: "Add a message",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "Please select a user to send it to",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    photokudo: {
      type: String,
    }
  },
  { timestamps: true }
);

const Kudo = mongoose.model("Kudo", kudosSchema);
module.exports = Kudo;
