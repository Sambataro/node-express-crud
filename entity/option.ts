import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    option_id: number;

    @Column()
    nextNode: number;

    @Column()
    option_name: string;

}
export default  Option;
