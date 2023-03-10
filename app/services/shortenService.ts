import { uuid } from "uuidv4";
import Url from "../models/Url";
import { Op } from "sequelize";

const slugAlreadyExists = "Url with given slug already exists.";
const urlAlreadyExists = "Url already exists with slug: ";
const slugDoesntExist = "Shortened url with given slug does not exist.";

export const createSlug = async (req, res) => {
  const body = req.body;
  const slug = body.slug || uuid().substring(0, 4);
  const exists = await Url.findOne({
    where: { [Op.or]: { slug, url: body.url } },
  });
  if (exists) {
    res.status(422);
    return res.send(
      exists.dataValues.url === body.url
        ? urlAlreadyExists + exists.dataValues.slug
        : slugAlreadyExists
    );
  }

  const newShortenedUrl = await Url.create({ slug, url: body.url });
  res.status(201);
  res.send(newShortenedUrl.dataValues);
};

export const retrieveUrlBySlug = async (req, res) => {
  const { slug } = req.params;
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  await Url.update(
    { hitCount: url.dataValues.hitCount + 1 },
    { where: { slug } }
  );

  res.redirect(302, url.dataValues.url);
};

export const getInfoBySlug = async (req, res) => {
  const { slug } = req.params;
  console.log("slug is ", slug);
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  res.send(url);
};

export const deleteUrlBySlug = async (req, res) => {
  const { slug } = req.body;
  const url = slug ? await Url.findOne({ where: { slug } }) : null;
  if (!url) {
    res.status(422);
    return res.send(slugDoesntExist);
  }
  Url.destroy({ where: { slug } });
  res.status(200);
  res.send("ok");
};

export const searchUrls = async (req, res) => {
  const { url, slug, sortBy } = req.query;
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  const where = {
    [Op.and]: {
      url: { [Op.like]: `%${req.query.url || ""}%` },
      slug: { [Op.like]: `%${req.query.slug || ""}%` },
    },
  };

  let nextPage = "?";
  for (let [query, value] of Object.entries({ url, slug, sortBy })) {
    if (value) {
      nextPage += `${query}=${value}&`;
    }
  }
  nextPage += `limit=${limit}&`;
  const previousPage = nextPage + `offset=${Math.max(offset - limit, 0)}`;
  nextPage += `offset=${offset + limit}`;

  const data = await Url.findAll({
    where,
    limit,
    offset,
    order: [[sortBy || "id", "ASC"]],
  });
  const response = { data, nextPage, previousPage };
  res.send(response);
};
