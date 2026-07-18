const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

const triggerCaptioning = async (imageId, imageUrl) => {
  await axios.post(`${AI_SERVICE_URL}/caption`, 
    { image_id: imageId,image_url: imageUrl},
    {
    headers: {
      "X-API-Key": process.env.INTERNAL_API_KEY,
    }
  });
};

const searchImages = async (query, limit = 10) => {
  const response = await axios.post(`${AI_SERVICE_URL}/search`, 
    { query, limit},
    {
    headers: {
      "X-API-Key": process.env.INTERNAL_API_KEY,
    }
  });
  return response.data; // array of { image_id, caption, tags }
};

module.exports = { triggerCaptioning, searchImages };