const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (name, email, password) => {
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
        return { error: "EMAIL_ALREADY_EXISTS" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(name, email, passwordHash);

    return { user };
};

const login = async (email, password) => {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
        return { error: "INVALID_CREDENTIALS" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
        return { error: "INVALID_CREDENTIALS" };
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};

module.exports = {
    register,
    login
};