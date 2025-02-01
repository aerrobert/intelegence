"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedAudioModel = void 0;
const audio_1 = require("../../interfaces/audio");
class MockedAudioModel extends audio_1.AudioModel {
    props;
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return 'mocked-audio';
    }
    async handleSpeak(input) {
        return {
            rawAudio: this.props.responses.shift() || '',
            alignments: {
                characters: [],
                character_end_times_seconds: [],
                character_start_times_seconds: [],
            },
        };
    }
}
exports.MockedAudioModel = MockedAudioModel;
//# sourceMappingURL=mocked.js.map