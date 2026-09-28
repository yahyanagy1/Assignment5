import chalk from "chalk";
import { Sequelize } from "sequelize";


export const sequelize = new Sequelize("assignment_5","root","",{
    host : "localhost",
    dialect : "mysql"
})


export const DBconnection = async()=>{
    try {
        await sequelize.authenticate()
        console.log(chalk.green("DB connection successfully"));
        
    } catch (error) {
        console.log(chalk.red("DB connection failed =>", error));
        
    }
}



export const DBsync = async ()=>{
    sequelize.sync({alter: false}).then(()=>{
        console.log(chalk.green("DBsync connected"));
        
    }).catch((err)=>{
        console.log(chalk.red("DB connection failed"));
        
    })
}

