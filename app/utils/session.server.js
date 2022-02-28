import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

export async function login(username, password) {
//export a function called login that accepts username and password
//function should query prisma for a user with username
const user = await db.user.findUnique({where: {username}});
//if there is no user, return null
if (!user) {
    return null;
}

//use bcrypt.compare to compare password to users passwordHash
const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
//if passwords don't match return null
if(!isCorrectPassword) { return null };
//if passwords match, return user

return user;
}

export async function createUserSession(userID, route) {
    //create new session
    //set userID field on the session
    //redirect to the given route setting the setcookie header
}



