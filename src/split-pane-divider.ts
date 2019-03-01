import {
    ComponentBind,
    ComponentDetached,
    customElement,
    DOM,
    inject
} from 'aurelia-framework';
import { ResizeEvent } from './resize-event';
import { SplitPane } from './split-pane';
import { setFlexBasis } from './util';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(DOM.Element, EventAggregator)
@customElement(SplitPaneDivider.TAG_NAME)
export class SplitPaneDivider implements ComponentBind, ComponentDetached {
    static readonly TAG_NAME = 'split-pane-divider';

    static isDivider(element: Element): boolean {
        return element.tagName.toLowerCase() === SplitPaneDivider.TAG_NAME;
    }

    parent!: SplitPane;

    private startCoordinate = 0;
    private previousSiblingSize = 0;
    private nextSiblingSize = 0;

    private readonly element: Element;
    private readonly events: EventAggregator;

    constructor(element: any, events: EventAggregator) {
        this.element = element;
        this.events = events;
    }

    bind(bindingContext: SplitPane): void {
        this.parent = bindingContext;
    }

    detached(): void {
        this.removeListeners();
    }

    mouseDown(event: MouseEvent): void {
        if (event.button === 0 && this.startDrag(event.clientX, event.clientY)) {

            // style rules may have affected the flex-basis of the children,
            // so recalculate them now we are starting a drag
            this.parent.setChildrenFlexBasis();

            DOM.addEventListener('mousemove', this.mouseMove, false);
            DOM.addEventListener('mouseup', this.stopDrag, false);
        }
    }

    touchStart(event: TouchEvent): void {
        let touch = event.touches[0];

        if (this.startDrag(touch.clientX, touch.clientY)) {

            // style rules may have affected the flex-basis of the children,
            // so recalculate them now we are starting a drag
            this.parent.setChildrenFlexBasis();

            DOM.addEventListener('touchmove', this.touchMove, false);
            DOM.addEventListener('touchend', this.stopDrag, false);
        }
    }

    private startDrag(clientX: number, clientY: number): boolean {
        let prev = this.element.previousElementSibling;
        let next = this.element.nextElementSibling;

        if (prev !== null && next !== null) {
            let prevRect = prev.getBoundingClientRect();
            let nextRect = next.getBoundingClientRect();

            switch (this.parent.direction) {
                case 'horizontal':
                    this.startCoordinate = clientX;
                    this.previousSiblingSize = prevRect.width;
                    this.nextSiblingSize = nextRect.width;
                    return true;

                case 'vertical':
                    this.startCoordinate = clientY;
                    this.previousSiblingSize = prevRect.height;
                    this.nextSiblingSize = nextRect.height;
                    return true;

                default:
                    return false;
            }
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
        let currentCoordinate = this.parent.direction === 'horizontal' ? clientX : clientY;
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

            let resizeEvent: ResizeEvent = {
                clientX,
                clientY
            };

            this.events.publish('split-pane:resize', resizeEvent);
        }
    }

    private removeListeners() {
        DOM.removeEventListener('mousemove', this.mouseMove, false);
        DOM.removeEventListener('mouseup', this.stopDrag, false);
        DOM.removeEventListener('touchmove', this.touchMove, false);
        DOM.removeEventListener('touchend', this.stopDrag, false);
    }
}
