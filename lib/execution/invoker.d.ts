import { Cache } from './cache';
import { Execution } from '../framework/execution';
export interface InvokerProps<ResultType> {
    cache?: Cache<ResultType>;
}
export declare class Invoker<InputType, ResultType> {
    private cache;
    constructor(props?: InvokerProps<ResultType>);
    protected getName(): string;
    invoke(input: InputType, execution: Execution): Promise<ResultType>;
    protected onInvoke(input: InputType, execution: Execution): Promise<ResultType>;
}
