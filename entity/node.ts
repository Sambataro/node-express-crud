import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import option from "./option";

@Entity()
export class Node {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    name: string;

    @Column()
    options: Array<option>
}
export default  Node;
