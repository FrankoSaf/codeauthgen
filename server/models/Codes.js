const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema(
  {
    templateName: {
      type: String,
      unique: true,
    },
    backend: String,
    frontend: String,
    frontEndPackageJSON: String,
    backendPackageJSON: String,
    backendDotenv: String,
    tree: {
      type: String,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
