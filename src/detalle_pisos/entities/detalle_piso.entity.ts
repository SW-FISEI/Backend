import { Aula } from "src/aulas/entities/aula.entity";
import { Edificio } from "src/edificios/entities/edificio.entity";
import { Piso } from "src/pisos/entities/piso.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detalle_piso')
export class DetallePiso {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Aula, aula => aula.detalle_piso, { cascade: true })
    aula: Aula[];

    @ManyToOne(() => Edificio, edificio => edificio.detalle_pisos, { nullable: false })
    @JoinColumn({ name: 'id_edificio' })
    edificio: Edificio;

    @ManyToOne(() => Piso, piso => piso.detalle_pisos, { nullable: false })
    @JoinColumn({ name: 'id_piso' })
    piso: Piso;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
