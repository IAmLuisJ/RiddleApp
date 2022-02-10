import {Outlet} from 'remix';
import jokeStyle from './styles/jokes.css';
//export link to stylesheet
const links = ()=> {
    return [{
        rel: "stylesheet",
        href: jokeStyle,
    }]
}

function JokesRoute() {
    //this would be the parent route
    //Outlet is where the child component will render
    //anything rendered under routes/jokes will render as a child, even /jokes/index
    return(
        <div>
            <h1>Riddles</h1>
            <main>
                <Outlet />
            </main>
        </div>
    );

}

export default JokesRoute;