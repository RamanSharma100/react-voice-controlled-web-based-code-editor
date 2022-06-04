const snippets = {
  html: `
   <!DOCTYPE html> 
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>

    `,
  react: `
    import React from "react"; 
    const Component = () => {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
    export default Component;
    `,
};

const voiceCommands = {
  snippet: {
    commands: ["generate html snippet", "generate react snippet"],
    actions: ["generatehtmlsnippet", "generatereactsnippet"],
    responses: ["Here is your html snippet", "Here is your react snippet"],
    code: [snippets.html, snippets.react],
  },
};

export default voiceCommands;
