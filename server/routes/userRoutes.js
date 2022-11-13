const express = require('express');
const router = express.Router();
const {
  userAccountSettingsUpdate,
  resetController,
  settingNewPassController,
} = require('../controllers/userController');
const upload = require('../middleware/uploadImage');
const cloudinary = require('../utils/cloudinary');
const {
  getUserTemplatesController,
  getSpecificTemplatesController,
  deleteSavedTemplate,
  downloadTemplate,
} = require('../controllers/codeController');
const ExpressError = require('../ExpressError');
const { restartPassword } = require('../middleware/restartPassword');
const User = require('../models/User');
const { updatingUser } = require('../schema/updateProfile');
const { userValidation } = require('../schema/schemaValidator');
router.put(
  '/update/:id',
  updatingUser,
  userValidation,
  userAccountSettingsUpdate
);
router.get('/dashBoard', (req, res) => {
  const user = req.session.user;
  res.json(user);
});
router.post('/emailreset', resetController);
router.put('/confirmNew/:id', settingNewPassController);
router.get('/setNewPassword/:id', restartPassword, (req, res) => {
  const token = req.params.id;
  res.json({ token: token });
});

router.post('/profilephoto', upload.single('photo'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findByIdAndUpdate(
      req.session.user._id,
      { avatar: result.url },
      { new: true }
    );
    req.session.user = user;
    res.json(result);
  } catch (e) {
    res.send('No');
  }
});
router.get('/templates/download/:id', downloadTemplate);
router.get('/templates', getUserTemplatesController);
router.get('/templates/:id', getSpecificTemplatesController);
router.delete('/templates/:deleteId', deleteSavedTemplate);
module.exports = router;
