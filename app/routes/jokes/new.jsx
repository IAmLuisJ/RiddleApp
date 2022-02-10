import { Form, redirect, json } from "remix";
import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

//function to validate server side
function validateJokeContent(content) {
    if(content.length < 2) {
        return 'Joke is too short';
    }
}

function validateName(name) {
    if(name.length < 2) {
        return "The joke name is too short";
    }
}

//to submit a form, export an action function
export const action = async ({request}) => {
    //in this action function, we perform CRUD, then return a redirect
    const form = await request.formData();
    const name = form.get("name");
    const content = form.get("content");
    //usually you'll want to validate the data here before submitting to your database, ie make sure its a string, not SQL
    if( typeof name !== "string" || typeof content !== "string") {
        return json({formError: "form not submmited correctly"}, {status: 400});
    }

    if(name.length < 2) {
        return json({formError: "name too short"}, {status: 400});
    }
    //use the client object db, 
    const joke = await db.joke.create({ data: { name, content }});
    return redirect(`/jokes/${joke.id}`);
}

function New() {
    return (<div>
        <h1>Add your own joke to the Database</h1>
        <Form method="post">
            <label>Name:</label>
            <input type="text" name="name" />
            <label>Content:</label>
            <input type="text" name="content" />
            <button type="submit" className="button">Submit</button>
        </Form>
    </div>)
}


export default New;