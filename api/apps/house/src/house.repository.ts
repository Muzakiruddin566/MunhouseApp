import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { House } from "../../../libs/common/src/schemas/house.schema";

@Injectable()
export class HouseRepository extends AbstractRepository<House>{
    protected readonly logger = new Logger(HouseRepository.name)

    constructor(
        @InjectModel(House.name) userModel: Model<House>, 
        @InjectConnection() connection: Connection
    ){
        super(userModel,connection)
    }
    
}