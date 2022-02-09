import {Outlet} from 'remix';

function JokesRoute() {
    //this would be the parent route
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