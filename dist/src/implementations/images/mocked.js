"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedImageModel = void 0;
const image_1 = require("../../interfaces/image");
class MockedImageModel extends image_1.ImageModel {
    props;
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return 'mocked-image';
    }
    async handleInvoke(input) {
        return {
            imageBase64: this.props.responses.shift() || '',
        };
    }
}
exports.MockedImageModel = MockedImageModel;
//# sourceMappingURL=mocked.js.map