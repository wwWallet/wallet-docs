import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Vp {
	@PrimaryGeneratedColumn()
	id: number = -1;

	@Column({ unique: true })
	vpIdentifier: string = "";

	@Column({ type: 'blob', nullable: false })
	jwt: string = "";

	// audience in did format
	@Column()
	aud: string = "";

}