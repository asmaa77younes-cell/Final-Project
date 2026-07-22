const express = require("express");
console.log('Hi')
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.patch('/items/:productId', cartController.updateItemQuantity);
router.delete('/items/:productId', cartController.removeItem);
router.delete('/', cartController.clearCart);

module.exports = router;