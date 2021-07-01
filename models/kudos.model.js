const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const kudosSchema = new Schema(
    {
        eskudos: {
            type: [{
                type: String,
                required: "Please select one",
                enum: Object.keys(eskudos)
            }],
            default: [],
        },
        message: {
            type: String,
            required: "Add a message"
        },
        recipient: {
            type: String,
            required: "Who are you sending this to?"
        },
        sender: {
            type: String
        }
    },
    { timestamps: true }
)

const Kudos = mongoose.model("Kudos", kudosSchema)
module.exports = Kudos