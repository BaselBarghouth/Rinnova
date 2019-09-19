const express = require("express");

const db = require("../../database/items");

const router = express.Router();

// const auth = require('../../Auth/auth')

const start = async () => {
  const controller = await db();

  router.get("/", async (req, res, next) => {
    const items = await controller.getItems();

    res.status(200).json({
      message: "get req is working ",
      items: items
    });
  });
  router.post("/", async (req, res, next) => {
    const newItem = {
      item_name: req.body.item_name,
      item_image: req.body.item_image,
      item_desc: req.body.item_desc,
      item_price: req.body.item_price
    };

    const item = await controller.addItem(newItem);
    res.status(200).json({
      message: "post req is working ",
      item: item
    });
  });
  router.get("/:id", async (req, res, next) => {
    const id = req.params.id;

    res.status(200).json({
      message: "get req is working ",
      id: id
    });
  });
  router.patch("/:id", async (req, res, next) => {
    const updateItem = {
      item_id: req.params.id,
      item_name: req.body.item_name,
      item_image: req.body.item_image,
      item_desc: req.body.item_desc,
      item_price: req.body.item_price
    };
    const item = await controller.updateItem(updateItem);
    res.status(200).json({
      message: "patch req is working ",
      id: item
    });
  });
  router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const itemDeleted = await controller.deleteItem(id);
    res.status(200).json({
      message: "delete req is working ",
      id: itemDeleted
    });
  });
};
start();
module.exports = router;
