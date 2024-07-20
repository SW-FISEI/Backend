import { Maquina } from "src/maquinas/entities/maquina.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('observaciones')
export class Observacione {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 300, nullable: false })
    descripcion: string

    @ManyToOne(() => Maquina, maquina => maquina.observaciones, { nullable: false })
    @JoinColumn({ name: 'id_maquina' })
    maquina: Maquina;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
