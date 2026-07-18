const express = require("express");
const { upload } = require("../utils/uploadExport");

const { imageUpload, deleteImages, getFavorites, getParticularImage, getImages, addComment, toggleFavorite, imageFilter, smartSearch } = require("../controllers/image.controller");
const { verifyMiddleware } = require("../middleware/auth.middleware");

const imageRouter = express.Router();

//to uplaod images
imageRouter.post("/upload", verifyMiddleware, upload.array("images", 15), imageUpload);

// albumId se favorites done
imageRouter.get("/:albumId/images/favorites", verifyMiddleware, getFavorites);

// albumId se filter by tag done
imageRouter.get("/:albumId/images/filter", verifyMiddleware, imageFilter);

// albumId se saari images done
imageRouter.get("/:albumId/images", verifyMiddleware, getImages);

//ai smart search
imageRouter.get("/search", verifyMiddleware, smartSearch);

// specific image done
imageRouter.get("/:imageId", verifyMiddleware, getParticularImage);

// toggle favorite done
imageRouter.put("/:imageId/toggle", verifyMiddleware, toggleFavorite);

// add comment
imageRouter.patch("/:imageId/comment", verifyMiddleware, addComment);

// delete image done
imageRouter.delete("/delete/:imageId", verifyMiddleware, deleteImages);


module.exports = { imageRouter }
