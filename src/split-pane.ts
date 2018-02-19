import {
    autoinject,
    bindable,
    ComponentAttached,
    ComponentBind,
    ComponentDetached,
    ComponentUnbind,
    DOM,
    TemplatingEngine,
    View
} from 'aurelia-framework';
import { setFlexBasis } from './util';

export type Direction = 'horizontal' | 'vertical';

const DIVIDER_TAG_NAME = 'SPLIT-PANE-DIVIDER';

@autoinject()
export class SplitPane implements ComponentBind, ComponentAttached, ComponentDetached, ComponentUnbind {
    @bindable() direction!: Direction;

    private dividers: View[] = [];

    private element: HTMLElement;
    private templatingEngine: TemplatingEngine;

    constructor(element: Element, templatingEngine: TemplatingEngine) {
        this.element = element as HTMLElement;
        this.templatingEngine = templatingEngine;
    }

    isHorizontal() {
        return this.direction === 'horizontal';
    }

    isVertical() {
        return this.direction === 'vertical';
    }

    bind(): void {
        if (this.direction === undefined) {
            this.direction = 'horizontal';
        }
    }

    attached(): void {
        this.addDividers();
    }

    detached(): void {
        for (let divider of this.dividers) {
            divider.detached();
        }
    }

    unbind(): void {
        for (let divider of this.dividers) {
            divider.unbind();
        }
    }

    /**
     * Iterates through the element's children and sets each <code>flex-basis</code> style property to the
     * size of the [bounding rectangle]{@link Element#getBoundingClientRect}, to prepare for the property being
     * modified during a [drag]{@link SplitPaneDivider#drag}.
     */
    setChildrenFlexBasis() {
        let horizontal = this.isHorizontal();
        let children = this.element.children;
        let sizes: number[] = [];

        // record each child's calculated size
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);

            if (child.tagName === DIVIDER_TAG_NAME) {
                sizes.push(0);
            } else {
                let rect = child.getBoundingClientRect();
                sizes.push(horizontal ? rect.width : rect.height);
            }
        }

        // set the flex-basis property in a separate iteration to avoid impacting the size of the other children
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);

            if (child.tagName !== DIVIDER_TAG_NAME) {
                setFlexBasis(child, sizes[i]);
            }
        }
    }

    private addDividers() {
        let children = Array.prototype.slice.call(this.element.children);

        for (let i = 0; i < children.length - 1; i++) {
            let child = children[i];

            let divider = DOM.createElement(DIVIDER_TAG_NAME);
            let dividerView = this.templatingEngine.enhance({
                element: divider,
                bindingContext: this
            });

            this.dividers.push(dividerView);
            child.parentNode.insertBefore(divider, child.nextSibling);
        }
    }
}
