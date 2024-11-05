import { HyperExecution } from './hyper-execution';
import { Tasks } from './tasks';
export class Hyper {
    constructor(props) {
        var _a, _b, _c, _d, _e;
        this.chatBasedLLMInvoker = (_a = props.using) === null || _a === void 0 ? void 0 : _a.chatBasedLLM;
        this.imageGeneratorInvoker = (_b = props.using) === null || _b === void 0 ? void 0 : _b.imageGenerator;
        this.imageToImageGeneratorInvoker = (_c = props.using) === null || _c === void 0 ? void 0 : _c.imageToImageGenerator;
        this.executionDataSaver = (_d = props.saving) === null || _d === void 0 ? void 0 : _d.executionData;
        this.tasks = new Tasks({
            onTaskEvent: ((_e = props.events) === null || _e === void 0 ? void 0 : _e.onTaskEvent) || (() => { }),
        });
    }
    begin() {
        return new HyperExecution(this);
    }
}
