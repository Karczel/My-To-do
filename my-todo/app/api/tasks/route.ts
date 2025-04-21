// app/api/tasks/route.ts
import { auth } from '@/auth';
import { getTasksByUser, createTask, updateTaskStatus } from '@/lib/task';
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

export async function PUT(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(null, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !status || !['todo', 'inprogress', 'done'].includes(status)) {
    return new NextResponse('Invalid task data', { status: 400 });
  }

  try {
    const updatedTask = await updateTaskStatus(id, status);
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}