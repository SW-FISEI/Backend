import { Aula } from "src/aulas/entities/aula.entity";
import { Edificio } from "src/edificios/entities/edificio.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pisos')
export class Piso {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string

    @ManyToOne(() => Edificio, edificio => edificio.pisos, { nullable: false })
    @JoinColumn({ name: 'id_edificio' })
    edificio: Edificio;

    @OneToMany(() => Aula, aula => aula.piso)
    aula: Aula[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
