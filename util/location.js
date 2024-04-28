const axios = require("axios");

const HttpError = require("../models/http-error");
const secrets = require("../config/secrets");

const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
  // return {
  //   lat: 40.7484445,
  //   lng: -73.9882393,
  // };

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  const response = await axios.get(url);
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for specified address.",
      422
    );
    return error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
