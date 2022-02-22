import {Outlet, useLoaderData, Link} from 'remix';
import jokeStyle from '~/styles/jokes.css';
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

//export link to stylesheet
export const links = ()=> {
    return [{
        rel: "stylesheet",
        href: jokeStyle,
    }]
}

//export loader function to get items from database and display a link to  them
export const loader = async () => {
    const data = {
        //fetch data using prisma
        //the findMany() function can take an object argument to limit results, such as:
        //{ take: 5, select: { id: true, name: true }, orderBy: { createdAt: "desc" } }
        //where take is total items to return, select is columnName
        jokeListItems: await db.joke.findMany()
    };
    return data;
}

function JokesRoute() {
    const loaderData = useLoaderData();
    
    //this would be the parent route
    //Outlet is where the child component will render
    //anything rendered under routes/jokes will render as a child, even /jokes/index
    return(
        <div className='jokes-layout'>
            <header className='jokes-header'>
                <div className='container'>
                    <h1 className='home-link'>
                        <Link to="/">Home</Link>
                    </h1>
                </div>
            </header>
            <main className='jokes-main'>
                <div className='container'>
                    <div className='jokes-list'>
                        <Link to=".">Get a random joke</Link>
                        <p>List of jokes</p>
                        <ul>
                            {loaderData.jokeListItems.map(joke => (
                            <li key={joke.id}>
                            <Link to={joke.id}>{joke.name}</Link>
                            </li>
                             ))}
                             <li>{loaderData.jokeListItems[0].name}</li>
                        </ul>
                        <Link to="new" className='button'>Add your own Joke</Link>
                    </div>
                    <div className='jokes-outlet'>
                    <Outlet />
                </div>
                </div>
            </main>
        </div>
    );

}

export default JokesRoute;