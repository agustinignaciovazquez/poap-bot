const pino = require("pino");
const queryHelper = require("./db");
const pgPromise = require("pg-promise");
require('dotenv').config();

const logger = pino({
    prettyPrint: {
        colorize: true, // --colorize
        errorLikeObjectKeys: ["err", "error"], // --errorLikeObjectKeys
        levelFirst: false, // --levelFirst
        messageKey: "msg", // --messageKey
        levelKey: "level", // --levelKey
        timestampKey: "time", // --timestampKey
        translateTime: true, // --translateTime
        ignore: "pid,hostname", // --ignore,
    },
});

const db = pgPromise()({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "",
});
async function getCode(username, event_id){

    const getCode = await queryHelper.checkCodeForEventUsername(
        db,
        event_id,
        username
    );
    if( getCode){
        logger.info(`[DM] Code found: ${getCode.code}`);
    }else{
        logger.error(`[DM] Code not found`);
    }

}
for(let i = 0; i < 100; i++){
    getCode('sameusere123eeeasd3e', '0215bdd3-7ae0-48be-b92e-ebe154f154a0');
}
