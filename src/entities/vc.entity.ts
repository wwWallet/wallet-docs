import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Vc {
	@PrimaryGeneratedColumn()
	id: number = -1;

	@Column({ unique: true })
	identifier: string = "";

	@Column({ type: 'blob', nullable: false })
	jwt: string = "";

	@Column({ nullable: false })
	holderDID: string = "";

	@Column({ nullable: false })
	issuerDID: string = "";

	@Column()
	issuerInstitution: string = "";

	@Column()
	type: string = "";
}