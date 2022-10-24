const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const MiddlewaresController = require("../controllers/MiddlewaresController");

router.post(
  "/addorder",
  MiddlewaresController.verifyToken,
  OrderController.addOrder
);
router.put(
  "/:id",
  MiddlewaresController.verifyAdmin,
  OrderController.completeOrder
);
router.get(
  "/booksfromorder/:id",
  MiddlewaresController.verifyAdmin,
  OrderController.getBooksFromOrderDetails
);
router.get(
  "/getallorders",
  MiddlewaresController.verifyAdmin,
  OrderController.getAllOrders
);

module.exports = router;
