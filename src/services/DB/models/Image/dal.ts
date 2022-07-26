import { ImageModelType } from "./model";
import { ImageType } from "./types";

export const addImage = async (imageModel: ImageModelType, imageData : ImageType) => (
    imageModel.insertMany([imageData])
)

export const deleteImage = async (imageModel: ImageModelType, userId: string, imageName: string) => {
    const {deletedCount} = await imageModel.deleteMany({
        userId,
        imageName
    })
    return deletedCount > 0;
}