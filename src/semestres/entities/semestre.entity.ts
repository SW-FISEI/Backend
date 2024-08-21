import { DetalleMateria } from "src/detalle_materias/entities/detalle_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('semestres')
export class Semestre {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, nullable: false, unique: true })
    nombre: string

    @OneToMany(() => DetalleMateria, detalle_materia => detalle_materia.semestre, { cascade: true })
    detalle_materias: DetalleMateria[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
