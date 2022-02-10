import {
   LiveReload, Meta, Outlet, Links
} from "remix";
import globalStyle from './styles/global.css';

//meta function can add a meta tag to the rendered page, things like title
//just return an object with the properties
// { property: "value" }
export function meta() {
  return { title: "Riddle App" };
}

export const links = () => {
  return[{
    rel: "stylesheet",
    href: globalStyle,
  }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}