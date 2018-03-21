import { Message } from '../models/message';

export class MessageService {
    private readonly messages: Message[] = [
        {
            authorId: 0,
            title: `Pick up from airport?`,
            content: `Hi Derek! Hope all is well with you. I am coming home from London and was wondering if you`
        },
        {
            authorId: 0,
            title: `Dinner`,
            content: `Hi Everyone, I'm so excited to see everyone at dinner tonight. Parking can be tough around th`
        },
        {
            authorId: 0,
            title: `New kitten`,
            content: `I just wanted to send along a few photos of Louis, the newest member of the family. He wasted n`
        },
        {
            authorId: 1,
            title: `Troy's Birthday`,
            content: `Hey Everyone, Thanks for joining us for Troy's birthday. We all had an amazing time celebrati`
        },
        {
            authorId: 2,
            title: `Jersey trip`,
            content: `I'm going to the East Coast for a short visit this weekend. Just wondering if you want me to pi`
        },
        {
            authorId: 2,
            title: `Moving next week`,
            content: `Remember when you said you'd help us move? We just signed a new lease. It's not far from w`
        },
        {
            authorId: 4,
            title: `This weekend`,
            content: `Hi, I wanted to touch base regarding our plans for this weekend. Are we still planning on goin`
        }
    ];

    all(): Message[] {
        return this.messages;
    }

    from(authorId: number): Message[] {
        return this.messages.filter(msg => msg.authorId === authorId);
    }
}
