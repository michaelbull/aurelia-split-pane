function flexBasis(): string {
    let style = document.documentElement.style;

    if ('flexBasis' in style) {
        return 'flexBasis'
    } else if ('webkitFlexBasis' in style) {
        return 'webkitFlexBasis';
    } else if ('msFlexPreferredSize' in style) {
        return 'msFlexPreferredSize';
    } else {
        return 'flexBasis';
    }
}

export function setFlexBasis(element: Element, basis: number): void {
    let style: any = (element as HTMLElement).style;
    style[flexBasis()] = `${basis}px`;
}
