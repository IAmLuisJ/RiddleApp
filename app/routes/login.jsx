import loginStyle from '~/styles/login.css';
import { Form, Link, useSearchParams, json, redirect, useActionData } from 'remix';
import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

function validatePassword(password) {
    if(password.length < 2) {
        return 'Passwords must be at least 2 characters long';
    }
}

export const links = ()=> {
    return [{
        rel: "stylesheet", href: loginStyle
    }]
}

export const action = async ({request}) => {
    //handle requests to this url
    const form = await request.formData();
    const loginType = form.get("loginType");
    const username = form.get("username");
    const password = form.get("password");
    //pull value of redirect to, if undefined, set to jokes
    const redirectTo = form.get("redirectTo") || "/jokes";

    const fields = { loginType, username, password };

    const fieldErrors = {
        password: validatePassword(password)
    }
    
    switch(loginType) {
        case "login": {
            //login to get the user
            const userExists = await db.user.findFirst({ where: {username}});
            //if there is no user, offer to create user error
            if(userExists) {   
                return json({formError: "No user found"}, { status: 400});
            } else {
                //if there is a user, create session and redirect to /jokes
            return redirect("/jokes");
            }
        }
        case "register": {
            const userExists = await db.user.findFirst({ where: {username}});
            if(userExists) {
                return json({formError: "user already exists"}, { status: 400});
            } else {
                //create user
                
                //redirect to jokes
                return redirect("/jokes");
            }
            break;
        }
        default: {
            return json({formError: "login type invalid"}, { status: 400});
            break;
        } 
    }

}

const Login = () => {
    //component that renders a login form
    //search params pulls value of redirectTo from URL parameters if its provided
    const [searchParams] = useSearchParams();

    //actionData used to display error messages from the action function
    const actionData = useActionData();
    return (<div className='container'>
        <div className='content'>
        <h1>Login</h1>
        <Form method="post">
            <fieldset>
                <label>
                <input type="radio" value="Login" name="loginType" defaultChecked />
                    Login
                </label>
                <label>
                <input type="radio" value="Register" name="loginType" />
                Register</label>
                <input type="hidden" name="redirectTo" value={searchParams.get("redirectTo") ?? undefined} />
            </fieldset>
            <label>Username</label>
            <input type="text" name="username" />
           
            <label>Password</label>
            <input type="password" name="password" />
            {actionData?.fieldErrors?.password ? <p>{actionData?.fieldErrors.password}</p> : null}
            <button type='submit' className='button'>Submit</button>
        </Form>
        <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jokes">Jokes</Link>
          </li>
        </ul>
      </div>
      </div>
    </div>)
}

export default Login;