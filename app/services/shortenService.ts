import { uuid } from "uuidv4";
import Url from "../models/Url";
const slugAlreadyExists = "Url with given slug already exists.";
const slugDoesntExist = "Shortened url with given slug does not exist.";

export const createSlug = async (req, res) => {
  const body = req.body;
  const slug = body.slug || uuid().substring(0, 4);
  const slugExists = await Url.findOne({ where: { slug: slug } });
  if (slugExists) {
    res.status(422);
    return res.send(slugAlreadyExists);
  }

  const newShortenedUrl = await Url.create({ slug, url: body.url });

  res.send(newShortenedUrl.dataValues);
};

export const retrieveUrlBySlug = async (req, res) => {
  const slug = req.params.slug;
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  await Url.update(
    { hitCount: url.dataValues.hitCount + 1, latestHit: Date.now() },
    { where: { slug } }
  );
  res.redirect(url.dataValues.url);
};

export const getInfoBySlug = async (req, res) => {
  const slug = req.params.slug;
  console.log("slug is ", slug);
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  res.send(url);
};

export const deleteUrlBySlug = async (req, res) => {
  const slug = req.body.slug;
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  Url.destroy({ where: { slug } });
  res.status(200);
  res.send("ok");
};
