// data/task.ts

import { db } from '@/lib/db';

export async function getTasksByUserId(userId: string) {
  try {
    return await db.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    return [];
  }
}

export async function getTaskById(taskId: string) {
  try {
    return await db.task.findUnique({
      where: { id: taskId }
    });
  } catch {
    return null;
  }
}

export async function createTask(
  title: string,
  userId: string,
  status: string = 'TODO',
  description?: string
) {
  try {
    return await db.task.create({
      data: {
        title,
        userId,
        status,
        description
      }
    });
  } catch {
    return null;
  }
}

export async function updateTask(
  taskId: string,
  updates: { title?: string; description?: string; status?: string }
) {
  try {
    return await db.task.update({
      where: { id: taskId },
      data: updates
    });
  } catch {
    return null;
  }
}

export async function deleteTask(taskId: string) {
  try {
    return await db.task.delete({
      where: { id: taskId }
    });
  } catch {
    return null;
  }
}
