import {
    Aurelia,
    PLATFORM
} from 'aurelia-framework';

export async function configure(aurelia: Aurelia): Promise<void> {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-split-pane'));

    await aurelia.start();
    await aurelia.setRoot(PLATFORM.moduleName('app'));
}
