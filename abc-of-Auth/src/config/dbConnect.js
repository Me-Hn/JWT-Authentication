import mongoose from "mongoose";

const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.CONECION_STRING)
        console.log(`DataBase Connected Succesfully`)
    } catch (error) {
        console.log(`DataBase NOT Connected !!`,error)

    }
}

export default dbConnect;