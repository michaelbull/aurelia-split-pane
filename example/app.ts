import { Direction } from '../src/split-pane';
import './app.scss';

export class App {
    direction: Direction = 'horizontal';

    toggleDirection(): void {
        this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
    }
}
