# aurelia-split-pane

[![npm](https://img.shields.io/npm/v/aurelia-split-pane.svg)][npm] [![License](https://img.shields.io/github/license/michaelbull/aurelia-split-pane.svg)](LICENSE)

A custom element for resizable split panes.

A running demonstration can be found [here][demo].

## Browser Support

Tested to work on the following browser versions:

| <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/edge/edge.svg" alt="IE / Edge" width="16px" height="16px" /><br />IE / Edge | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/firefox/firefox.svg" alt="Firefox" width="16px" height="16px" /><br />Firefox | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/chrome/chrome.svg" alt="Chrome" width="16px" height="16px" /><br />Chrome | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/opera/opera.svg" alt="Opera" width="16px" height="16px" /><br />Opera |
|:----:|:---:|:---:|:---:|
| Edge | 29+ | 32+ | 20+ |

## Installation

Install the package via [npm][npm]:

```bash
npm install --save aurelia-split-pane
```

Install the plugin in your [Aurelia][aurelia] project:

```typescript
export function configure(aurelia: Aurelia): void {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-split-pane'));
}
```

Import the [Sass][sass] stylesheet:

```sass
@import '~aurelia-split-pane/style';
```

## Usage

The demo contains [two usage examples][examples].

Below are a couple of simple examples:

```html
<split-pane direction="horizontal">
  <div>Left</div>
  <div>Right</div>
</split-pane>
```

```html
<split-pane direction="vertical" style="height: 500px; text-align: center;">
  <div>North</div>
  <split-pane direction="horizontal">
    <div>West</div>
    <div>Center</div>
    <div>East</div>
  </split-pane>
  <div>South</div>
</split-pane>
```

## Contributing

Bug reports and pull requests are welcome on [GitHub][github].

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`](LICENSE) file for the copyright information and licensing terms.

[demo]: https://michaelbull.github.io/aurelia-split-pane/
[npm]: https://www.npmjs.com/package/aurelia-split-pane
[aurelia]: http://aurelia.io/
[sass]: http://sass-lang.com/
[examples]: https://github.com/michaelbull/aurelia-split-pane/blob/master/example/app.html#L28
[github]: https://github.com/michaelbull/aurelia-split-pane
