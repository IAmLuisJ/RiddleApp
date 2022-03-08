import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({params})=> {
    //load joke from ID that should be in the route params
    const joke = await db.joke.findUnique({where: { id: params.jokeID }});
    // if(!joke) {
    //     throw new Error("Joke not Found");
    // }
    return joke;
}

const jokeComponent = () => {

const loaderData = useLoaderData();
//loader function to pull data
console.log(loaderData);
    return(<div>
        {loaderData ? <p>Joke Loaded</p> : <p>Joke not loaded</p>}
        <p>This would catch all items under this route, and pass the url as a parameter to the component loader.</p>
        <p>{loaderData.content}</p>
    </div>);
}
//export a link function in the route module
export default jokeComponent;