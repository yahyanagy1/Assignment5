import userModel from "../../DB/models/User/user.model.js"

// 1. POST /users/signup
export const signup = async (data) => {
    const existingUser = await userModel.findOne({ where: { email: data.email } })
    if (existingUser) {
        return { status: 400, message: "Email already exists." }
    }
    const user = userModel.build(data)
    await user.save()
    return { status: 201, message: "User added successfully." }
}

// 2. PUT /users/:id
export const upsertUser = async (id, data) => {
    await userModel.upsert(
        { id, ...data },
        { validate: false }
    )
    return { status: 200, message: "user created or updated successfully" }
}

// 3. GET /users/by-email?email=...
export const getUserByEmail = async (email) => {
    const user = await userModel.findOne({ where: { email } })
    if (!user) {
        return { status: 404, message: "no user found" }
    }
    return { status: 200, data: { user } }
}

// 4. GET /users/:id (exclude role)
export const getUserById = async (id) => {
    const user = await userModel.findByPk(id, {
        attributes: { exclude: ["role"] }
    })
    if (!user) {
        return { status: 404, message: "no user found" }
    }
    return { status: 200, data: { user } }
}