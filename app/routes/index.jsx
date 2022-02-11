import { Link } from "remix";
import style from '../styles/index.css';

//to link stylesheets to a view/component, export a "links" function, with an array of the link items as objects, using key value pair syntax for properties
export const links = () => {
    return[
        {rel: "stylesheet", href: style}
    ];
};

export default function Index() {
    return(<div>
        <h1>Hello, welcome to the app</h1>
        <p>Click below to explore components</p>
        <Link to="/jokes">Jokes</Link>
        <br></br>
        <Link to="/jokes/new">Create New</Link>
        <br />
        <Link to="/login">Login</Link>
    </div>);
}

