import { DetallePiso } from "src/detalle_pisos/entities/detalle_piso.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pisos')
export class Piso {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @OneToMany(() => DetallePiso, detalle_pisos => detalle_pisos.piso, { cascade: true })
    detalle_pisos: DetallePiso[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
