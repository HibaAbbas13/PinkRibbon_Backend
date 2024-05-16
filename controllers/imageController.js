// imageController.js
const Image = require('../models/image');

class ImageController {
  static uploadimage = async (req, res) => {
    try {
      const newImage = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
      });
      await newImage.save();
      res.status(201).send('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading image');
    }
  }
}

module.exports = ImageController;