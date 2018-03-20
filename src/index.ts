import {
    FrameworkConfiguration,
    PLATFORM
} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        PLATFORM.moduleName('./split-pane'),
        PLATFORM.moduleName('./split-pane-divider')
    ]);
}

export * from './split-pane';
export * from './split-pane-divider';
export * from './util';
