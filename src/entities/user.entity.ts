import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = -1;

	@Column({ unique: true, nullable: false })
	did: string = "";

  @Column({ nullable: false })
  passwordHash: string = "";


	// @Column({ type: 'blob', nullable: false })
	// keys: string = "";
}