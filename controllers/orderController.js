import orderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { ownerId, owner, title, siteManager, productId, unitPrice, quantity, totalAmount } = req.body;
  try {
    const newOrder = await orderModel.create({
      ownerId,
      owner,
      title,
      siteManager,
      productId,
      unitPrice,
      quantity,
      totalAmount
    });
    return res.status(201).json({ success: true, Product: newOrder });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const getAllOrders = async (req, res) => {
  orderModel
    .find()
    .then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

// get order by site manager's id
export const getOrderBySM = async (req, res) => {
  const { siteManager } = req.query;
  console.log(siteManager)
  orderModel.find({siteManager}).then((orders) => {
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

// get order by orderId
export const getOrderById = async (req, res) => {
  const { orderId } = req.query;

  orderModel
    .findById(orderId)
    .then((order) => {
      res.json({ success: true, order: order });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export const updateOrderById = async (req, res) => {
  const { orderId, status } = req.body;

  const updateOrder = {
    status,
  };

  orderModel
    .findByIdAndUpdate(orderId, updateOrder)
    .then(() => {
      res.status(200).send({ status: "Order status updated" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};
