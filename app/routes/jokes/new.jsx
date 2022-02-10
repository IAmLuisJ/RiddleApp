import { Form } from "remix";


function New() {
    return (<div style={styles}>
        <Form>
            <label>Name:</label>
            <input type="text" name="name" />
            <label>Content:</label>
            <input type="text" name="content" />
            <input type="submit" />
        </Form>
    </div>)
}

const styles = {
    border: "red 1px"
}

export default New;