import { IsMongoId } from 'class-validator';

export class getUserByIdDto {
  @IsMongoId({ message: 'id should be mongo Object id!' })
  id: string;
}
