import express from "express";
import {
  createSlug,
  deleteUrlBySlug,
  getInfoBySlug,
  retrieveUrlBySlug,
  searchUrls,
} from "../services/shortenService";
const shortenRouter = express.Router();

shortenRouter.route("/").post(createSlug);

shortenRouter.route("/search").get(searchUrls);

shortenRouter.route("/:slug").get(retrieveUrlBySlug);

shortenRouter.route("/info/:slug").get(getInfoBySlug);

shortenRouter.route("/").delete(deleteUrlBySlug);

export default shortenRouter;
