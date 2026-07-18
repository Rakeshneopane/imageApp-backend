require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const { ImageModel } = require("../models/image.model");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";
const DELAY_MS = 4500; // stay under Gemini's rate limit

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const backfill = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const images = await ImageModel.find({});
    console.log(`Found ${images.length} images to process`);

    let success = 0;
    let failed = 0;

    for (const image of images) {
        try {
            await axios.post(`${AI_SERVICE_URL}/caption`, {
                image_id: image._id.toString(),
                image_url: image.url,
            });
            success++;
            console.log(`[${success + failed}/${images.length}] Captioned: ${image.name}`);
        } catch (err) {
            failed++;
            console.error(`Failed for ${image.name}:`, err.response?.data || err.message);
        }
        await sleep(DELAY_MS);
    }

    console.log(`Done. Success: ${success}, Failed: ${failed}`);
    await mongoose.disconnect();
};

//backfill();