import { client } from "./index.js";

async function addUser(id, name, age, email, phone, address) {
    return await client.db("userApp").collection("user").insertOne({ id, name, age, email, phone, address });
}

async function getUserById(Id) {
    return await client.db("userApp").collection("user").findOne({id:Id})
}

async function getAllUser(req) {
    return await client.db("userApp").collection("user").find(req.query).toArray()
}

async function updateUser( Id,id, name, age, email, phone, address) {
    return await client.db("userApp").collection("user").updateOne({ id:Id }, { $set: { id, name, age, email, phone, address } });
}

async function deleteUserById(Id) {
    return await client.db("userApp").collection("user").deleteOne({ id:Id});
}

export { addUser, getUserById, getAllUser,updateUser, deleteUserById}