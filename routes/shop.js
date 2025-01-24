const express = require(`express`);
const router = express.Router();

const shopController = require(`../controllers/items`);
router.get(`/`,shopController.getShopItems);

module.exports = router;