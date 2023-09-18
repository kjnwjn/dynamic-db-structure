import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn({ generated: true })
  id: string;

  // @Index({ unique: true })
  // @Column()
  // value: string;

  @Column({ length: 500, name: 'first_name' })
  firstName: string;

  @Column({ length: 500, name: 'last_name' })
  lastName: string;

  @Column({ length: 500, nullable: true })
  email: string;

  @Column({ name: 'avatar_path', nullable: true })
  avatarPath: string;
}
