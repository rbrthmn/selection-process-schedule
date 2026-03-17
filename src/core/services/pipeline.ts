import { injectable } from 'inversify';
import { Pipe } from './pipe';

@injectable()
export class Pipeline {
    private pipes: Pipe[] = [];

    public through(pipes: Pipe[]): this {
        this.pipes = pipes;
        return this;
    }

    public send(payload: any): any {
        const pipeline = this.pipes.reduceRight(
            (next, pipe) => (passable: any) => pipe.handle(passable, next),
            (passable: any) => passable 
        );

        return pipeline(payload);
    }
}
