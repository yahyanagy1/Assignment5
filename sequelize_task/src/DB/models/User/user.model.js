import { DataTypes } from "sequelize";
import { sequelize } from "../../db.connection.js";

const userModel = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,

        }

    },
    password: {
        type: DataTypes.STRING,

        cheackPasswordLength(value) {
            if (value.length <= 6) {
                 throw new Error("password must be greatar than 6 characters");
                 
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        validate: {
            type: DataTypes.ENUM("user", "admin")
        }
    }


}, {


    timestamps: true,
    userModel:"user",
    hooks:{
        beforeCreate: (user)=>{
         if (user.name.length <= 2) {
            throw new Error("name must be greater than two characters");
            
         }
 
        }
    },


    indexes: [
        { fields: ["name"], unique: true },
        { fields: ["email"], unique: true }

    ]

})







export default userModel