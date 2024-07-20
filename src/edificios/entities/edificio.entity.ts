import { Laboratorista } from "src/laboratoristas/entities/laboratorista.entity";
import { Piso } from "src/pisos/entities/piso.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('edificios')
export class Edificio {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @OneToMany(() => Laboratorista, laboratorista => laboratorista.edificio)
    laboratoristas: Laboratorista[];

    @OneToMany(() => Piso, piso => piso.edificio)
    pisos: Piso[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
