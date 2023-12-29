import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { ViewRequest } from "../../../libs/common/src/schemas/viewRequest.schema";

@Injectable()
export class ViewRequestRepository extends AbstractRepository<ViewRequest>{
    protected readonly logger = new Logger(ViewRequestRepository.name)

    constructor(
        @InjectModel(ViewRequest.name) viewRequestModel: Model<ViewRequest>, 
        @InjectConnection() connection: Connection
    ){
        super(viewRequestModel,connection)
    }
    
}