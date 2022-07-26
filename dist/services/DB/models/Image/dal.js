"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.addImage = void 0;
const addImage = (imageModel, imageData) => __awaiter(void 0, void 0, void 0, function* () {
    return (imageModel.insertMany([imageData]));
});
exports.addImage = addImage;
const deleteImage = (imageModel, userId, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    const { deletedCount } = yield imageModel.deleteMany({
        userId,
        imageName
    });
    return deletedCount > 0;
});
exports.deleteImage = deleteImage;
//# sourceMappingURL=dal.js.map