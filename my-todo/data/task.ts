import { db } from '@/lib/db';

export async function getTasksByUser(userId: string) {
  return await db.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getTask(id: string) {
  return await db.task.findUnique({ where: { id } });
}

export async function getAllTasksForUser(userId: string) {
    return db.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

export async function createTask(userId: string, title: string) {
    return db.task.create({
      data: {
        userId,
        title,
        status: 'todo',
      }
    });
  }

export async function updateTask(
  id: string,
  data: {
    title?: string;
    status?: string;
    description?: string;
  }
) {
  return await db.task.update({ where: { id }, data });
}

export async function updateTaskStatus(taskId: string, status: string) {
  console.log(taskId);  
  return db.task.update({
      where: { id: taskId },
      data: { status }
    });
  }


export async function deleteTask(id: string) {
    return await db.task.delete({ where: { id } });
}