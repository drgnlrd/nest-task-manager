import { TaskStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { IsEnum } from 'class-validator';

export class UpdateStatusByIdDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
