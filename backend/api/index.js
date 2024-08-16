import Router from "router";
import finalhandler from "finalhandler";
import storeData from "../services/storeData.js";
import search from "../services/search.js";
import { allowCors } from "../utils/utils.js";

const router = Router();
router.post("/api/storeData", storeData);
router.get("/api/search", search);

function getRoutes(req, res) {
  console.log(`Received request: ${req.method} ${req.url}`);
  router(req, res, finalhandler(req, res));
}

export default allowCors(getRoutes);
// export default getRoutes;
