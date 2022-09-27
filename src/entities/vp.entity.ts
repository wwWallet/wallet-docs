import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Vp {
	@PrimaryGeneratedColumn()
	id: number = -1;

	@Column({ unique: true })
	vpIdentifier: string = "";

	@Column({ type: 'blob', nullable: false })
	jwt: string = "";

	@Column({ nullable: false })
	audienceDID: string = "";

	@Column({ nullable: false })
	holderDID: string = "";

	@Column( { nullable: false } )
	issuerDID: string = "";

}