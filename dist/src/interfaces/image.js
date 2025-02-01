"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
class ImageModel {
    getName() {
        return 'unknown';
    }
    generate(input) {
        input.logger.log(`Generating image for prompt: '${input.prompt}'`);
        return this.handleInvoke(input);
    }
    handleInvoke(input) {
        throw new Error('Not implemented');
    }
}
exports.ImageModel = ImageModel;
//# sourceMappingURL=image.js.map