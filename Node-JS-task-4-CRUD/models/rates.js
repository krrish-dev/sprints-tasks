import { _fetch } from "../utils.js";

export const fetchRate = async (curr) =>
  _fetch("https://api.exchangerate.host/latest?base=USD").then(
    (res) => res.rates[curr]
  );