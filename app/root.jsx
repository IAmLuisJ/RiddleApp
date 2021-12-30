import {
   LiveReload, Meta
} from "remix";

export function meta() {
  return { title: "Riddle App" };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
      </head>
      <body>
        Hello World
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
