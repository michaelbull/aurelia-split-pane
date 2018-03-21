import { autoinject } from 'aurelia-framework';
import {
    RoutableComponentActivate,
    RoutableComponentCanActivate
} from 'aurelia-router';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message-service';

@autoinject()
export class Messages implements RoutableComponentCanActivate, RoutableComponentActivate {
    messages: Message[] = [];

    private readonly messageService: MessageService;

    constructor(userService: MessageService) {
        this.messageService = userService;
    }

    canActivate(params: any): boolean {
        return !isNaN(params.contact);
    }

    activate(params: any): void {
        this.messages = this.messageService.from(Number(params.contact));
    }
}
