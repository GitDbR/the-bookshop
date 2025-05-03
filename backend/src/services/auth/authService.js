const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const createUser = async (userData) => {
    try {
        const email = userData.email;
        const password = userData.password;
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const exsistingUser = await User.findOne({ email: email })

        if (exsistingUser) {
            throw new error(`User already exsist!`);
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'CUSTOMER',
            password: hashedPassword
        });
        await user.save();
        return user
    } catch (error) {
        console.log(`Error creating user: ${error}`);
    }
};

const loginUser = async (userData) => {
    try {
        const email = userData.email;
        const password = userData.password;

        const exsistingUser = await User.findOne({ email: email })

        if (!exsistingUser) {
            throw new error(`User not exsist!`);
        };
        const isPasswordValid = await bcrypt.compare(password, exsistingUser.password);
        if (!isPasswordValid) {
            throw new error(`Invalid Password!`);
        };

        const token = jwt.sign({ id: exsistingUser._id, role: exsistingUser.role },
            process.env.JWT_SERECT,
            { expiresIn: '1d' })

        return token;
    } catch (error) {
        console.log(`Error creating user: ${error}`);
    }
};

module.exports = { createUser, loginUser };