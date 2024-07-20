import { Aula } from "src/aulas/entities/aula.entity";
import { Software } from "src/softwares/entities/software.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('software_aulas')
export class SoftwareAula {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Software, software => software.software_aula, { nullable: false })
    @JoinColumn({ name: 'id_software' })
    software: Software;

    @ManyToOne(() => Aula, aula => aula.software_aula, { nullable: false })
    @JoinColumn({ name: 'id_aula' })
    aula: Aula;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
