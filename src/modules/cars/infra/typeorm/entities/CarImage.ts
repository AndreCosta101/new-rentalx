import { v4 as uuidV4} from  'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity('cars')
class CarImage {

    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: string;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { CarImage }

