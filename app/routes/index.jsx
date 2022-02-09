import { Link } from "remix";

export default function Index() {
    return(<div>
        <h1>Hello, welcome to the app</h1>
        <p>Click below to explore components</p>
        <Link to="/jokes">Jokes</Link>
    </div>);
}