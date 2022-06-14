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
  div: {
    commands: [
      "generate div with class",
      "generate div tag with class",
      "generate div with id",
      "generate div tag with id",
      "generate div",
      "generate div tag",
    ],
    actions: [
      "generatedivwithclass",
      "generatedivwithclass",
      "generatedivwithid",
      "generatedivwithid",
      "generatediv",
      "generatediv",
    ],
    responses: [
      "Here is your div tag with class",
      "Here is your div tag with class",
      "Here is your div tag with id",
      "Here is your div tag with id",
      "Here is your div tag",
      "Here is your div tag",
    ],
    code: [
      `<div class="class_name"></div>`,
      `<div class="class_name"></div>`,
      `<div id="id_name"></div>`,
      `<div id="id_name"></div>`,
      `<div></div>`,
      `<div></div>`,
    ],
  },
  function: {
    commands: [
      "generate function",
      "generate function with name",
      "generate function with parameters",
    ],
    actions: [
      "generatefunction",
      "generatefunctionwithname",
      "generatefunctionwithparameters",
    ],
    responses: [
      "Here is your function",
      "Here is your function with name",
      "Here is your function with parameters",
    ],
    code: [
      `function function_name() {
        // code
      }`,
      `function function_name() {
        // code
      }`,
      `function function_name(parameters) {
        // code
      }`,
    ],
  },
};

export default voiceCommands;
