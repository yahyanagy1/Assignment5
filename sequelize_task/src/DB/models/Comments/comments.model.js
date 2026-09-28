import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db.connection.js";
import { postModel } from "../Post/post.model.js";
import userModel from "../User/user.model.js";

export class commentModel extends Model{}
commentModel.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    content:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName:"comment",
    timestamps:true,
    
})


// Comment-Post relationship
postModel.hasMany(commentModel, { foreignKey: "postId" });
commentModel.belongsTo(postModel, { foreignKey: "postId" });

// Comment-User relationship
userModel.hasMany(commentModel, { foreignKey: "userId" });
commentModel.belongsTo(userModel, { foreignKey: "userId" });