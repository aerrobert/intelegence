import { ElevenLabsAudioModel, Intelegence } from '../src';

const intelegence = new Intelegence({
    audio: new ElevenLabsAudioModel({
        voiceId: 'XB0fDUnXU5powFXDhCwa',
    }),
});

console.dir(await intelegence.speak('how are you today?'));
