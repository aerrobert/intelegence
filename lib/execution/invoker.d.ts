import { Cache } from './cache';
import { HyperExecution } from '../framework/hyper-execution';
export interface InvokerProps<ResultType> {
    cache?: Cache<ResultType>;
}
export declare class Invoker<InputType, ResultType> {
    private cache;
    constructor(props?: InvokerProps<ResultType>);
    protected getName(): string;
    invoke(input: InputType, execution: HyperExecution): Promise<ResultType>;
    protected onInvoke(input: InputType, execution: HyperExecution): Promise<ResultType>;
}
