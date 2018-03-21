import { Direction } from '../../../src';

export class Example {
    direction: Direction = 'horizontal';

    toggleDirection(): void {
        this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
    }
}
