const e = require("express");


const router = e.Router();


router.post("/ create")
router.get("/:restaurantId")
router.get("all")
router.put("/:restaurant/update")
router.delete("/delete")

const restaurantRouter = router 

module.exports = restaurantRouter