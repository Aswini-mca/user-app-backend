import express from "express";
import { addUser, deleteUserById, getAllUser, getUserById, updateUser } from "../helpers.js";


const router = express.Router()

//add user
router.post('/add', async (req, res) => {
    const { id, name, age, email, phone, address } = req.body;
    try {
        //validate required fields
        if (!id) {
            res.status(400).send({ error: "Id field is required" })
            return
        }
        if (!name) {
            res.status(400).send({ error: "Name field is required" })
            return
        }
        if (!age) {
            res.status(400).send({ error: "Age field is required" })
            return
        }
        if (!email) {
            res.status(400).send({ error: "Email field is required" })
            return
        }
        if (!phone) {
            res.status(400).send({ error: "Phone field is required" })
            return
        }
        if (!address) {
            res.status(400).send({ error: "Address field is required" })
            return
        }

        // Validate that id, age, and phone are numbers
        if (isNaN(id) || isNaN(age) || isNaN(phone)) {
            return res.status(400).send({ error: "Id, Age, and Phone must be numbers" });
        }

        const newUser = await addUser(parseInt(id), name, parseInt(age), email, parseInt(phone), address)

        if (!newUser) {
            return res.status(400).send({ error: "Error occured while adding new user" })
        }
        res.status(201).json({ data: newUser, message: "User Added Successfully" })
    } catch (error) {

        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

//to get all users
router.get('/all', async (req, res) => {
    const getusers = await getAllUser(req)
    res.status(201).json({ data: getusers })
})

//get user by Id
router.get('/:Id', async (req, res) => {
    const { Id } = req.params
    const getuser = await getUserById(parseInt(Id))
    res.status(201).json({ data: getuser })
})

//update user
router.put('/edit/:Id', async (req, res) => {
    const { Id } = req.params
    console.log(Id)
    const { id, name, age, email, phone, address } = req.body
    const user = await getUserById(parseInt(Id))
    console.log(user)
    try {
        if (!user) {
            return res.status(500).send({ error: "User data is not available" })
        }
        //validate required fields
        if (!id) {
            res.status(400).send({ error: "Id field is required" })
            return
        }
        if (!name) {
            res.status(400).send({ error: "Name field is required" })
            return
        }
        if (!age) {
            res.status(400).send({ error: "Age field is required" })
            return
        }
        if (!email) {
            res.status(400).send({ error: "Email field is required" })
            return
        }
        if (!phone) {
            res.status(400).send({ error: "Phone field is required" })
            return
        }
        if (!address) {
            res.status(400).send({ error: "Address field is required" })
            return
        }

        // Validate that id, age, and phone are numbers
        if (isNaN(id) || isNaN(age) || isNaN(phone)) {
            return res.status(400).send({ error: "Id, Age, and Phone must be numbers" });
        }

        const update = await updateUser(parseInt(Id), parseInt(id), name, parseInt(age), email, parseInt(phone), address)
        res.status(200).json({ data: update, message: "User Data Updated Successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})


//delete user by id
router.delete('/delete/:Id', async (req, res) => {
    const { Id } = req.params
    try {
        const result = await deleteUserById(parseInt(Id))
        if (result.deletedCount === 0) {
            return res.status(400).send({ error: "Not able to delete user data" });
        }
        res.status(200).json({ data: result, message: "User Data Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})

export const usersRouter = router