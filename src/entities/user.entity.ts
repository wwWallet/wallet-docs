import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = -1;

    @Column({unique: true, nullable: false})
    email: string = "";


}