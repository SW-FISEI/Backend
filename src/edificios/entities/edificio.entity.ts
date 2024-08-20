import { DetallePiso } from "src/detalle_pisos/entities/detalle_piso.entity";
import { Laboratorista } from "src/laboratoristas/entities/laboratorista.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('edificios')
export class Edificio {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @OneToMany(() => Laboratorista, laboratorista => laboratorista.edificio)
    laboratoristas: Laboratorista[];

    @OneToMany(() => DetallePiso, detalle_pisos => detalle_pisos.edificio)
    detalle_pisos: DetallePiso[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
