import mongoose from 'mongoose';


const database = async (mongoUrl)=>{
  try{
    const connect = await mongoose.connect(mongoUrl,{
      dbName:'examination'
    });
    console.log(`🔗🔗🔗🔗 MongoDB Connected: ${connect.connection.host} 🔗🔗🔗🔗`);
    console.log('Connection to the database is successful✅.');
  }catch(error){
    console.error(
      `🔗‍💥🔗‍💥🔗‍💥🔗‍💥  ${error.message} 🔗‍💥🔗‍💥🔗‍💥🔗‍💥`
    );
    console.log('Could not connect to the database.', error);
    process.exit(1);
  }
}

export default database;