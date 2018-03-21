import { PLATFORM } from 'aurelia-framework';
import {
    ConfiguresRouter,
    Router,
    RouterConfiguration
} from 'aurelia-router';

export class Inbox implements ConfiguresRouter {
    configureRouter(config: RouterConfiguration, router: Router): void {
        config.mapRoute({
            route: '',
            name: 'contacts',
            viewPorts: {
                contacts: {
                    moduleId: PLATFORM.moduleName('./contacts')
                },
                messages: {
                    moduleId: PLATFORM.moduleName('./select-messages')
                }
            }
        }).mapRoute({
            route: '/:contact',
            name: 'messages',
            viewPorts: {
                contacts: {
                    moduleId: PLATFORM.moduleName('./contacts')
                },
                messages: {
                    moduleId: PLATFORM.moduleName('./messages')
                }
            }
        });
    }
}
