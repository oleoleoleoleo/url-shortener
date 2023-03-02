import express from "express";
import Url from "../models/Url";
import { uuid } from "uuidv4";
import {
  createSlug,
  deleteUrlBySlug,
  getInfoBySlug,
  retrieveUrlBySlug,
} from "../services/shortenService";
const shortenRouter = express.Router();

shortenRouter.route("/").post(createSlug);

shortenRouter.route("/:slug").get(retrieveUrlBySlug);

shortenRouter.route("/info/:slug").get(getInfoBySlug);

shortenRouter.route("/").delete(deleteUrlBySlug);

export default shortenRouter;
