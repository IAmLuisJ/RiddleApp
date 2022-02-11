import loginStyle from '~/styles/login.css';
import { Form, Link } from 'remix';

export const links = ()=> {
    return [{
        rel: "stylesheet", href: loginStyle
    }]
}

const login = () => {
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
            </fieldset>
            <label>Username</label>
            <input type="text" name="username" />
            <label>Password</label>
            <input type="password" name="password" />
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

export default login;