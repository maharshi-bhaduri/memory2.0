import Router from "router";
import finalhandler from "finalhandler";
import storeData from "../services/storeData";
import search from "../services/search";
import { allowCors } from "../utils/utils";

const router = Router();
router.post("/api/storeData", storeData);
router.get("/api/search", search);

function getRoutes(req, res) {
  console.log(`Received request: ${req.method} ${req.url}`);
  router(req, res, finalhandler(req, res));
}

export default allowCors(getRoutes);
// export default getRoutes;
