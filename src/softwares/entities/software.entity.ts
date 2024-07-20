import { SoftwareAula } from "src/software_aulas/entities/software_aula.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('software')
export class Software {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @Column({ type: "varchar", length: 50, nullable: false })
    version: string

    @Column({ type: "varchar", length: 200, nullable: false })
    descripcion: string

    @OneToMany(() => SoftwareAula, software_aula => software_aula.software)
    software_aula: SoftwareAula[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
