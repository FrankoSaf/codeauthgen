const Code = require("../models/Codes");
const ExpressError = require("../ExpressError");
const { populate } = require("../models/Codes");
exports.addCode = async (req, res, next) => {
  try {
    const user = req.session.user;
    const code = req.session.template;

    const newCode = new Code(code);
    newCode.createdBy = user._id;
    newCode.templateName = req.body.templateName;
    await newCode.save();
    res.send(newCode);
  } catch (err) {
    next(new ExpressError("Failed to save data"));
  }
};

exports.getUserTemplatesController = async (req, res, next) => {
  try {
    const template = await Code.find({ createdBy: req.session?.user?._id });
    res.json({ template });
  } catch (err) {
    next(new ExpressError("Failed to fetch template"));
  }
};

exports.getSpecificTemplatesController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const template = await Code.findById(id);
    res.send(template);
  } catch (err) {
    next(new ExpressError("Failed to retrieve template"));
  }
};

exports.deleteSavedTemplate = async (req, res, next) => {
  const id = req.params.deleteId;
  try {
    const templateToRemove = await Code.findByIdAndDelete(id);
    res.send(templateToRemove);
  } catch (error) {
    next(new ExpressError("Failed to delete template"));
  }
};
exports.downloadTemplate = async (req, res, next) => {
  const id = req.params.id;
  try {
    const downloadTemplate = await Code.findById(id);
    res.send(downloadTemplate);
  } catch (error) {
    next(new ExpressError("Failed to download template"));
  }
};
