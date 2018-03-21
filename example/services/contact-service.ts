import { Contact } from '../models/contact';

export class ContactService {
    private readonly contacts: Contact[] = [
        {
            id: 0,
            name: 'Allen Buchinski'
        },
        {
            id: 1,
            name: 'Jane Daniels'
        },
        {
            id: 2,
            name: 'Mary Ellen Mason'
        },
        {
            id: 3,
            name: 'Ryan Romero'
        },
        {
            id: 4,
            name: 'David Patton'
        }
    ];

    all(): Contact[] {
        return this.contacts;
    }
}
