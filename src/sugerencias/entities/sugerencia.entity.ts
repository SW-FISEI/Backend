import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('sugerencias')
export class Sugerencia {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 500, nullable: false })
    sugerencia: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
