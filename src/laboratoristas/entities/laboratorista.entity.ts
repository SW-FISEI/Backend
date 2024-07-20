import { Edificio } from "src/edificios/entities/edificio.entity";
import { Titulo } from "src/titulos/entities/titulo.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('laboratoristas')
export class Laboratorista {

    @PrimaryColumn()
    cedula: string

    @Column({ type: "varchar", length: 50, nullable: false })
    laboratorista: string

    @ManyToOne(() => Titulo, titulo => titulo.laboratorista, { nullable: false })
    @JoinColumn({ name: 'id_titulo' })
    titulo: Titulo

    @ManyToOne(() => Edificio, edificio => edificio.laboratoristas, { nullable: false })
    @JoinColumn({ name: 'id_edificio' })
    edificio: Edificio;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
