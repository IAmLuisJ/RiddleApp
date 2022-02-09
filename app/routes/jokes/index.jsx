import {Outlet} from 'remix';
function JokesRoute() {
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