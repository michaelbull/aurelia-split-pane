import {
    autoinject,
    ComponentBind,
    ComponentDetached,
    DOM
} from 'aurelia-framework';
import { SplitPane } from './split-pane';
import { setFlexBasis } from './util';

@autoinject()
export class SplitPaneDivider implements ComponentBind, ComponentDetached {
    parent!: SplitPane;

    private startCoordinate: number = 0;
    private previousSiblingSize: number = 0;
    private nextSiblingSize: number = 0;

    private element: Element;

    constructor(element: Element) {
        this.element = element;
    }

    bind(bindingContext: SplitPane): void {
        this.parent = bindingContext;
    }

    detached(): void {
        this.removeListeners();
    }

    mouseDown(event: MouseEvent): void {
        if (event.button === 0 && this.startDrag(event.clientX, event.clientY)) {
            DOM.addEventListener('mousemove', this.mouseMove, false);
            DOM.addEventListener('mouseup', this.stopDrag, false);
        }
    }

    touchStart(event: TouchEvent): void {
        let touch = event.touches[0];

        if (this.startDrag(touch.clientX, touch.clientY)) {
            DOM.addEventListener('touchmove', this.touchMove, false);
            DOM.addEventListener('touchend', this.stopDrag, false);
        }
    }

    private startDrag(clientX: number, clientY: number): boolean {
        let prev = this.element.previousElementSibling;
        let next = this.element.nextElementSibling;

        if (prev !== null && next !== null) {

            // style rules may have affected the flex-basis of the children,
            // so recalculate them now we are starting a drag
            this.parent.setChildrenFlexBasis();

            let prevRect = prev.getBoundingClientRect();
            let nextRect = next.getBoundingClientRect();

            if (this.parent.isHorizontal()) {
                this.startCoordinate = clientX;
                this.previousSiblingSize = prevRect.width;
                this.nextSiblingSize = nextRect.width;
            } else if (this.parent.isVertical()) {
                this.startCoordinate = clientY;
                this.previousSiblingSize = prevRect.height;
                this.nextSiblingSize = nextRect.height;
            }

            return true;
        } else {
            return false;
        }
    }

    private mouseMove = (event: MouseEvent): void => {
        this.drag(event.clientX, event.clientY);
    };

    private touchMove = (event: TouchEvent): void => {
        event.preventDefault(); // stop page from scrolling

        let touch = event.touches[0];
        this.drag(touch.clientX, touch.clientY);
    };

    private stopDrag = (): void => {
        this.removeListeners();
    };

    private drag(clientX: number, clientY: number): void {
        let currentCoordinate = this.parent.isHorizontal() ? clientX : clientY;
        let delta = currentCoordinate - this.startCoordinate;

        let prev = this.element.previousElementSibling;
        let next = this.element.nextElementSibling;

        if (prev !== null && next !== null) {
            let prevSize: number;
            let nextSize: number;

            if (delta < 0) {
                prevSize = Math.max(0, this.previousSiblingSize + delta);
                nextSize = this.nextSiblingSize - (prevSize - this.previousSiblingSize);
            } else if (delta > 0) {
                nextSize = Math.max(0, this.nextSiblingSize - delta);
                prevSize = this.previousSiblingSize - (nextSize - this.nextSiblingSize);
            } else {
                return;
            }

            setFlexBasis(prev, prevSize);
            setFlexBasis(next, nextSize);
        }
    }

    private removeListeners() {
        DOM.removeEventListener('mousemove', this.mouseMove, false);
        DOM.removeEventListener('mouseup', this.stopDrag, false);
        DOM.removeEventListener('touchmove', this.touchMove, false);
        DOM.removeEventListener('touchend', this.stopDrag, false);
    }
}
