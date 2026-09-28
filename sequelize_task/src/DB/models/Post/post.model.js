import { sequelize } from "../../db.connection.js";
import { DataTypes, Model } from "sequelize";
import userModel from "../User/user.model.js";


export class postModel extends Model{}
postModel.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING
    },
    content:{
        type:DataTypes.STRING
    },

},{
    sequelize,
    modelName:"post",
    timestamps:true,
    paranoid:true
})



userModel.hasMany(postModel,{
    foreignKey:"userId"
})
postModel.belongsTo(userModel,{
    foreignKey:"userId"
})



