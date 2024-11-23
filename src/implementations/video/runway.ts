import RunwayML from '@runwayml/sdk';
import { VideoModel, VideoModelInvokeProps, VideoModelResponse } from '../../interfaces/video';

export interface RunwayOptions {
    apiKey: string;
}

export class RunwayVideo extends VideoModel {
    private client: RunwayML;

    constructor(props: RunwayOptions) {
        super();
        this.client = new RunwayML({
            apiKey: props.apiKey,
        });
    }

    public override getName(): string {
        return 'runway';
    }

    protected override async handleAnimate(input: VideoModelInvokeProps): Promise<VideoModelResponse> {
        const imageToVideo = await this.client.imageToVideo.create({
            model: 'gen3a_turbo',
            promptImage: `data:image/png;base64,${input.base64Image}`,
            promptText: input.prompt,
        });

        const taskId = imageToVideo.id;
        let task: Awaited<ReturnType<typeof this.client.tasks.retrieve>>;
        while (true) {
            input.logger.debug('Waiting for runway task to complete...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            task = await this.client.tasks.retrieve(taskId);

            if (task.status === 'SUCCEEDED') {
                input.logger.debug('Runway task succeeded');
                const videoUrl = task.output![0];
                const videoRaw = await fetch(videoUrl);
                const videoBuffer = await videoRaw.arrayBuffer();
                const videoBase64 = Buffer.from(videoBuffer).toString('base64');
                return { base64Video: videoBase64 };
            }
            if (task.status === 'PENDING' || task.status === 'RUNNING') {
                continue;
            }

            input.logger.logError(`Runway task failed: ${task.status}`);
            throw new Error(`Runway task failed: ${task.status}`);
        }
    }
}
