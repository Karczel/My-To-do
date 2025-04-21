// app/api/tasks/route.ts
import { auth } from '@/auth';
import { getTasksByUser, createTask } from '@/lib/task';
import { NextResponse } from 'next/server';

export async function GET() {
  try{ 
    const session = await auth();

  if (!session?.user) {
    return new NextResponse(null, { status: 401 });
  }

  const tasks = await getTasksByUser(session.user.id);
  return NextResponse.json(tasks);
} catch (error) {
  console.error('Error fetching tasks:', error);
  return new NextResponse('Internal Server Error', { status: 500 });
}
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await req.json();

  if (!body.title || typeof body.title !== 'string') {
    return new NextResponse('Invalid task title', { status: 400 });
  }

  const newTask = await createTask(session.user.id, body.title);
  return NextResponse.json(newTask);
}
