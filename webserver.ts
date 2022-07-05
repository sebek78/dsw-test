// deno run --allow-net --allow-read --watch webserver.ts
import { serve } from "https://deno.land/std@0.146.0/http/server.ts";
const port = 8080;

const handler = async (request: Request): Promise<Response> => {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/style.css")) {
    const file = await Deno.readFile("./style.css");

    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Example</h1>
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
