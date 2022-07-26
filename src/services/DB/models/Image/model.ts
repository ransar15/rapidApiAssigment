import mongoose, { Model, Schema } from "mongoose";
import { ImageType } from "./types";

const imageSchema = new Schema({
    userId:  String, // String is shorthand for {type: String}
    imageName: String,
    size:   Number,    
  }, {timestamps: true});

  export const ImageModel = mongoose.model("image", imageSchema);

  export type ImageModelType = Model<ImageType>;