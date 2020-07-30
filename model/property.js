const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  adressNickname: { type: String },
  adress: { type: String },
  //UserId: { type: Schema.Types.ObjectID, ref: "User", required: true },
  aparment: [
    {
      number: { type: String, required: true },
      floor: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Property", propertySchema);
