const FLEX_BASIS_VENDOR_PROPERTIES = [
    'webkitFlexBasis',
    'msFlexPreferredSize'
];

function flexBasis(): string {
    for (let property in FLEX_BASIS_VENDOR_PROPERTIES) {
        if (property in document.documentElement.style) {
            return property;
        }
    }
    return 'flexBasis';
}

export function setFlexBasis(element: Element, basis: number): void {
    let style: any = (element as HTMLElement).style;
    style[flexBasis()] = `${basis}px`;
}
