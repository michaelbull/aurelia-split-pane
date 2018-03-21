import { PLATFORM } from 'aurelia-framework';
import {
    ConfiguresRouter,
    Router,
    RouterConfiguration
} from 'aurelia-router';
import './app.scss';

export class App implements ConfiguresRouter {
    configureRouter(config: RouterConfiguration, router: Router): void {
        config.mapRoute({
            route: '',
            name: 'example',
            moduleId: PLATFORM.moduleName('./pages/example/index')
        }).mapRoute({
            route: 'inbox',
            name: 'inbox',
            moduleId: PLATFORM.moduleName('./pages/inbox/index')
        }).mapUnknownRoutes({
            route: 'unknown',
            redirect: ''
        });
    }
}
