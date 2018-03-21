import { autoinject } from 'aurelia-framework';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact-service';

@autoinject()
export class Contacts {
    contacts: Contact[] = [];

    private readonly contactService: ContactService;

    constructor(contactService: ContactService) {
        this.contactService = contactService;
    }

    activate(params: any): void {
        this.contacts = this.contactService.all();
    }
}
