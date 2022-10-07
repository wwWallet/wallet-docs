import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TIR {
	@PrimaryGeneratedColumn()
	id: number = -1;

	@Column( { unique: true } )
	did: string = "";

	@Column({nullable: false})
	institution: string = "";

	@Column()
	country: string = "";

	@Column( { type: 'blob', nullable: false } )
	data: string = "";

}