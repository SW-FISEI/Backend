import { DetalleMateria } from "src/detalle_materias/entities/detalle_materia.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('paralelos')
export class Paralelo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 4, nullable: true, unique: true })
    nombre: string

    @OneToMany(() => DetalleMateria, detalle_materia => detalle_materia.paralelo)
    detalle_materias: DetalleMateria[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
