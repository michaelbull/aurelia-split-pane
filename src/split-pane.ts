import {
    bindable,
    bindingMode,
    ComponentAttached,
    ComponentDetached,
    ComponentUnbind,
    customElement,
    DOM,
    inject,
    TemplatingEngine,
    View
} from 'aurelia-framework';
import { SplitPaneDivider } from './split-pane-divider';
import { setFlexBasis } from './util';

export type Direction = 'horizontal' | 'vertical';

@inject(DOM.Element, TemplatingEngine)
@customElement('split-pane')
export class SplitPane implements ComponentAttached, ComponentDetached, ComponentUnbind {

    @bindable({ defaultBindingMode: bindingMode.toView })
    direction: Direction = 'horizontal';

    private readonly dividers: View[] = [];
    private readonly element: HTMLElement;
    private readonly templatingEngine: TemplatingEngine;

    constructor(element: any, templatingEngine: TemplatingEngine) {
        this.element = element;
        this.templatingEngine = templatingEngine;
    }

    attached(): void {
        let children = Array.prototype.slice.call(this.element.children);

        for (let i = 0; i < children.length - 1; i++) {
            let child = children[i];

            let divider = DOM.createElement(SplitPaneDivider.TAG_NAME);
            let dividerView = this.templatingEngine.enhance({
                element: divider,
                bindingContext: this
            });

            this.dividers.push(dividerView);
            this.element.insertBefore(divider, child.nextSibling);
        }
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
        let children = this.element.children;
        let sizes: number[] = [];

        // record each child's calculated size
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);

            if (SplitPaneDivider.isDivider(child)) {
                sizes.push(0);
            } else {
                let rect = child.getBoundingClientRect();
                sizes.push(this.direction === 'horizontal' ? rect.width : rect.height);
            }
        }

        // set the flex-basis property in a separate iteration to avoid impacting the size of the other children
        for (let i = 0; i < children.length; i++) {
            let child = children.item(i);

            if (!SplitPaneDivider.isDivider(child)) {
                setFlexBasis(child, sizes[i]);
            }
        }
    }
}
