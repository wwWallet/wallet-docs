import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Vc {
	@PrimaryGeneratedColumn()
	id: number = -1;

	@Column({ unique: true })
	vcIdentifier: string = "";

	@Column({ type: 'blob', nullable: false })
	jwt: string = "";

	@Column({ nullable: false })
	holderDID: string = "";
}