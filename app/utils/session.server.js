import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect, createCookieSessionStorage } from 'remix';

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

//session Secret in .env file
const sessionSecret = process.env.SESSION_SECRET;
//if there is no secret, throw an error
if(!sessionSecret) {
    throw new Error("No secret set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name:"r_session",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60*60*24*30,
        httpOnly:true,
    }
});

export async function createUserSession(userID, route) {
    //create new session
    const session = await storage.getSession();
    //set userID field on the session
    session.set("userId", userID);
    //redirect to the given route setting the setcookie header
    return redirect(route, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        }
    })
}

function getUserSession(request) {
    return storage.getSession(request.headers.get("Cookie"));
}



