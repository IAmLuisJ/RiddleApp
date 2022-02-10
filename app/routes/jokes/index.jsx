
//you can use a loader function here to pull a random object from the db

// export const loader: LoaderFunction = async () => {
//     const count = await db.joke.count();
//     const randomRowNumber = Math.floor(Math.random() * count);
//     const [randomJoke] = await db.joke.findMany({
//       take: 1,
//       skip: randomRowNumber
//     });
//     const data: LoaderData = { randomJoke };
//     return data;
//   };

function JokesIndexRoute() {
    return(
    <div>
        <p>Here's a nested route, all items rendered as a child component.</p>
        <p>blah blah blah</p>
    </div>)
}

export default JokesIndexRoute;