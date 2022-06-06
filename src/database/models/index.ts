import CustomerModel from "./customer";
const db: any = {}

const models: any = {
    modelsInitialization: (sequelize: any, DataType: any) => {
        db.Customer = CustomerModel(sequelize,DataType);
        return db;
    }
}
export default models;