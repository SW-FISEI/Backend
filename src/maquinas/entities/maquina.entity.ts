import { Aula } from "src/aulas/entities/aula.entity";
import { Observacione } from "src/observaciones/entities/observacione.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('maquinas')
export class Maquina {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @ManyToOne(() => Aula, aula => aula.maquinas, { nullable: false })
    @JoinColumn({ name: 'id_aula' })
    aula: Aula;

    @OneToMany(() => Observacione, observaciones => observaciones.maquina)
    observaciones: Observacione[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
