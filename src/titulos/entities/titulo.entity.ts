import { Docente } from "src/docentes/entities/docente.entity";
import { Laboratorista } from "src/laboratoristas/entities/laboratorista.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('titulos')
export class Titulo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @Column({ type: "varchar", length: 25, nullable: false })
    abreviacion: string

    @OneToMany(() => Docente, docente => docente.titulo)
    docente: Docente[]

    @OneToMany(() => Laboratorista, laboratorista => laboratorista.titulo)
    laboratorista: Laboratorista[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
