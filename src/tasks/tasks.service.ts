// Nest Imports
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

// Prisma Imports
import { PrismaService } from 'src/database/prisma.service';
import { Task, TaskStatus } from '@prisma/client';

// Dto Imports
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';

// Other Imports
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    return this.prisma.task.findMany({
      where: {
        OR: [
          {
            title: search
              ? {
                  contains: search,
                  mode: 'insensitive',
                }
              : undefined,
            status: status ? status : undefined,
          },
          {
            description: search
              ? {
                  contains: search,
                  mode: 'insensitive',
                }
              : undefined,
            status: status ? status : undefined,
          },
        ],
      },
    });
  }

  async getTaskById(id: string): Promise<Task | null> {
    const found = this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} does not exist!`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    return this.prisma.task.create({
      data: task,
    });
  }

  updateStatusById(id: string, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
  }

  deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: id },
    });
  }
}
