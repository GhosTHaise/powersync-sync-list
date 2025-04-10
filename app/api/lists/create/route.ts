import { db } from '@/database';
import { lists } from '@/database/schema';

export const POST = async (request: Request) => {
    const record = await request.json();
    
    const list: typeof lists.$inferInsert = {
        name: record.name,
        id: record.id,
        createdAt: record.createdAt,
        ownerId: record.ownerId
    };
    const createdList = await db.insert(lists).values(list);
    return Response.json({ message: "Created successfully" , data : createdList });
}