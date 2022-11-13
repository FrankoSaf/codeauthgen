const express = require('express');
const { addCode } = require('../controllers/codeController');
const {
  generateController,
  renderController,
} = require('../controllers/generateController');
const { checkTemplate } = require('../middleware/checkTemplate');
const router = express.Router();
// const { getAllCodes } = require('../controllers/renderController');
const { loggedInCheck } = require('../middleware/loggedInCheck');

router.get('/', renderController);
router.post('/generated-code', generateController);
router.post('/saveTemplate', loggedInCheck, checkTemplate, addCode);

module.exports = router;
