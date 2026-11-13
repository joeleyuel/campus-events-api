
import { Injectable, NotFoundException } from '@nestjs/common';

import { Event } from './interfaces/event.interface';
import { Session } from './interfaces/session.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';

@Injectable()
export class EventsService {
  private events: Event[] = [
    {
      id: 1,
      title: 'Tech Innovation Day',
      description: 'A technology and innovation conference.',
      location: 'Main Hall',
      eventDate: '2026-12-15',
      category: 'technology',
      isPublished: true,
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      description: 'Learn modern web development.',
      location: 'Computer Lab',
      eventDate: '2026-12-20',
      category: 'education',
      isPublished: true,
    },
    {
      id: 3,
      title: 'Campus Football Tournament',
      description: 'Annual college football competition.',
      location: 'Sports Field',
      eventDate: '2026-12-25',
      category: 'sports',
      isPublished: true,
    },
    {
      id: 4,
      title: 'Entrepreneurship Seminar',
      description: 'Explore business and entrepreneurship.',
      location: 'Conference Room',
      eventDate: '2026-11-10',
      category: 'business',
      isPublished: false,
    },
    {
      id: 5,
      title: 'Cultural Festival',
      description: 'Celebrate different cultures.',
      location: 'Main Hall',
      eventDate: '2027-01-10',
      category: 'culture',
      isPublished: true,
    },
  ];

  private sessions: Session[] = [
    {
      id: 1,
      eventId: 1,
      title: 'Introduction to Artificial Intelligence',
      startsAt: '09:00',
      endsAt: '10:00',
      room: 'Room 101',
    },
    {
      id: 2,
      eventId: 1,
      title: 'Future of Web Development',
      startsAt: '10:30',
      endsAt: '12:00',
      room: 'Room 102',
    },
    {
      id: 3,
      eventId: 2,
      title: 'HTML and CSS Fundamentals',
      startsAt: '09:00',
      endsAt: '10:30',
      room: 'Lab 1',
    },
    {
      id: 4,
      eventId: 2,
      title: 'Building with React',
      startsAt: '11:00',
      endsAt: '12:30',
      room: 'Lab 2',
    },
  ];

  // Get all events with filtering, sorting and pagination
  findAll(query: FindEventsQueryDto) {
    const {
      category,
      location,
      isPublished,
      sortBy,
      order,
    } = query;

    const page = query.page ?? 1;
    const limit = query.limit ?? 5;

    let result = [...this.events];

    // 1. Filtering
    if (category) {
      result = result.filter(
        (event) => event.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (location) {
      result = result.filter((event) =>
        event.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (isPublished !== undefined) {
      result = result.filter(
        (event) => event.isPublished === isPublished,
      );
    }

    // 2. Sorting
    if (sortBy) {
      result.sort((a, b) => {
        const comparison =
          sortBy === 'title'
            ? a.title.localeCompare(b.title)
            : a.eventDate.localeCompare(b.eventDate);

        return order === 'desc' ? -comparison : comparison;
      });
    }

    // 3. Pagination
    const total = result.length;
    const offset = (page - 1) * limit;
    const items = result.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Get upcoming events
  findUpcoming() {
    const today = new Date().toISOString().split('T')[0];

    return this.events.filter(
      (event) => event.eventDate >= today,
    );
  }

  // Get one event
  findOne(id: string) {
    const event = this.events.find(
      (event) => event.id === Number(id),
    );

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  // Get sessions belonging to an event
  findSessions(eventId: string) {
    this.findOne(eventId);

    return this.sessions.filter(
      (session) => session.eventId === Number(eventId),
    );
  }

  // Get one session belonging to an event
  findOneSession(eventId: string, sessionId: string) {
    this.findOne(eventId);

    const session = this.sessions.find(
      (session) =>
        session.id === Number(sessionId) &&
        session.eventId === Number(eventId),
    );

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  // Create an event
  create(dto: CreateEventDto) {
    const newEvent: Event = {
      id: Math.max(0, ...this.events.map((event) => event.id)) + 1,
      ...dto,
    };

    this.events.push(newEvent);

    return newEvent;
  }
}
