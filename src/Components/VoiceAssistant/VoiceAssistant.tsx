import { FunctionComponent as FC, useEffect, useState } from "react";
import { recognition } from "../../APIs/speechRecognitionAPI";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import checkCommands, { ICheckCommands } from "./checkCommands";

import "./VoiceAssistant.css";

import IVoiceAssistant from "./IVoiceAssistant";
import voiceCommands from "../../data/voiceCommands";

const VoiceAssistant: FC<IVoiceAssistant> = ({
  setText,
  text,
  isSpeaking,
  setIsSpeaking,
  openedEditors,
  openedEditorsContent,
  setOpenedEditors,
  setOpenedEditorsContent,
  textAreaRef,
  createNewFile,
  cancelFileCreation,
  setFileName,
  openNewFile,
  setIsSideBarOpen,
  setCommandsOpened,
  commandsOpened,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [generateTag, setGenerateTag] = useState<boolean>(false);
  const [createFile, setCreateFile] = useState<boolean>(false);

  const { speak, speaking, supported } = useSpeechSynthesis({
    callbackFunctions: [setText, setIsSpeaking],
  });

  useEffect(() => {
    if (speaking) {
      setIsSpeaking(true);
    } else {
      setIsSpeaking(false);
    }
  }, [speaking]);

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setText("started taking commands! How can i help you?");
      speak({ text: "started taking commands! How can i help you?" });
      recognition.start();
    } else {
      setIsMuted(true);
      setText("stopped taking commands! Thank you!");
      speak({ text: "stopped taking commands! Thank you!" });
      recognition.stop();
    }
  };

  // cursor position
  let cursorPosition = 0;

  // recognition

  recognition.onstart = () => {
    setIsMuted(false);
    setIsStarted(true);
  };

  const writeCode = (
    data: string,
    commandType: string,
    commandName: string
  ) => {
    if (null !== textAreaRef.current) {
      cursorPosition = textAreaRef.current.selectionStart;
      console.log(cursorPosition);
    }

    const openedFile: any = openedEditors.find(
      (editor: any) => editor.isOpened === true
    );

    setOpenedEditorsContent((prevEditors: any) =>
      prevEditors.map((editor: any) => {
        if (editor.file_name === openedFile.file_name) {
          if (null !== textAreaRef.current) {
            editor.content =
              textAreaRef.current.value.substring(0, cursorPosition) +
              data +
              textAreaRef.current.value.substring(cursorPosition);
          }
        }
        return editor;
      })
    );
    setText(
      (voiceCommands as any)[commandType].responses[
        (voiceCommands as any)[commandType].commands.indexOf(commandName)
      ]
    );
    speak({
      text: (voiceCommands as any)[commandType].responses[
        (voiceCommands as any)[commandType].commands.indexOf(commandName)
      ],
    });
  };

  recognition.onresult = (event: any) => {
    const command = event.results[0][0].transcript.toLowerCase();

    const { commandAction, commandType, commandName }: ICheckCommands =
      checkCommands(command);

    if (createFile) {
      if (Object.keys(voiceCommands).includes(commandType)) {
        setText(
          " create file command is activated now. please say file name with extension to generate that file, or,  say cancel to cancel the command"
        );
        speak({
          text: " create file command is activated now. please say file name with extension to generate that file, or,  say cancel to cancel the command",
        });
      } else if (command.replace(".", "") === "cancel") {
        setText(" cancelled creating file command!");
        speak({ text: " cancelled creating file command!" });
        cancelFileCreation(false);
        setCreateFile(false);
      } else {
        setFileName(
          command
            .replace("create", "")
            .trim()
            .split(" ")
            .join("")
            .trim()
            .replace(".", "")
            .replace("dot", ".")
            .trim()
        );
        openNewFile(
          command
            .replace("create", "")
            .trim()
            .split(" ")
            .join("")
            .trim()
            .replace(".", "")
            .replace("dot", ".")
            .trim()
        );
        setCreateFile(false);
        cancelFileCreation(false);
      }
    }

    if (!generateTag) {
      if (commandType === "stopCommands") {
        setIsMuted(true);
        setIsStarted(false);
        setText("stopped taking commands! Thank you!");
        speak({ text: "stopped taking commands! Thank you!" });
      }

      if (commandType === "openSideBar") {
        setIsSideBarOpen(true);
        setText("opened side bar!");
        speak({ text: "opened side bar!" });
      }

      if (commandType === "closeSideBar") {
        setIsSideBarOpen(false);
        setText("closed side bar!");
        speak({ text: "closed side bar!" });
      }

      if (commandType === "createFile") {
        if (["generatefile", "createfile"].includes(commandAction.toString())) {
          setText(
            "Which file do you want to generate? say create file_name with extension to generate file. or, say cancel to cancel"
          );
          speak({
            text: "Which file do you want to generate? create file_name with extension to generate file. or, say cancel to cancel  ",
          });
          createNewFile("voiceCommand");
          setCreateFile(true);
        }
      }

      if (commandType === "snippet") {
        const lang: string = commandName.split(" ").reverse()[1];
        const commandData = (voiceCommands as any)[commandType];
        const snippet =
          commandData.code[commandData.commands.indexOf(commandName)];
        const response =
          commandData.responses[commandData.commands.indexOf(commandName)];

        if (
          openedEditors.find((editor: any) => editor.isOpened === true) !==
          undefined
        ) {
          const fileName = (
            openedEditors.find((editor: any) => editor.isOpened === true) as any
          ).file_name;
          const content = (
            openedEditorsContent.find(
              (editor: any) => editor.file_name === fileName
            ) as any
          ).content;
          setText(response);
          speak({ text: response });
          setOpenedEditorsContent((prevEditors: any) =>
            prevEditors.map((editor: any) => {
              if (editor.file_name === fileName) {
                editor.content = content + snippet;
              }
              return editor;
            })
          );
          // if (null !== textAreaRef.current) {
          //   textAreaRef.current.focus();
          //   cursorCurrentPosition = textAreaRef.current.selectionStart;
          //   console.log(cursorCurrentPosition);
          // }

          // console.log(snippet);
        } else {
          setText("please open a file first!");
          speak({ text: "please open a file first!" });
        }
      }

      if (commandType === "openCommands") {
        if (commandsOpened) {
          setText("Commands table is already open!");
          speak({ text: "Commands table is already open!" });
        } else {
          setText("Opening commands List");
          speak({
            text: "Opening commands List",
          });
          setCommandsOpened(true);
        }
      }

      if (commandType === "closeCommands") {
        if (!commandsOpened) {
          setText("Commands table is already closed!");
          speak({ text: "Commands table is already closed!" });
        } else {
          setText("Closing commands List");
          speak({
            text: "Closing commands List",
          });
          setCommandsOpened(false);
        }
      }

      if (commandType === "div") {
        // find cursor position
        if (null !== textAreaRef.current) {
          cursorPosition = textAreaRef.current.selectionStart;
          console.log(cursorPosition);
        }

        writeCode(
          (voiceCommands as any)[commandType].code[
            (voiceCommands as any)[commandType].commands.indexOf(commandName)
          ],
          commandType,
          commandName
        );
      }

      if (commandType === "tag") {
        setText(
          "Which tag do you want to generate? say tag_name to generate tag. or, say cancel to cancel"
        );
        speak({
          text: "Which tag do you want to generate? say tag_name to generate tag. or, say cancel to cancel  ",
        });
        setGenerateTag(true);
      }

      if (commandType === "function") {
        const function_name = command
          .split("name")
          .pop()
          .split(" ")
          .join("_")
          .replace(".", "")
          .trim();
        const params = command
          .split("params")
          .pop()
          .split("and")
          .join(",")
          .replace(".", "")
          .trim();

        let code = (voiceCommands as any)[commandType].code[
          (voiceCommands as any)[commandType].commands.indexOf(commandName)
        ];

        const response = (voiceCommands as any)[commandType].responses[
          (voiceCommands as any)[commandType].commands.indexOf(commandName)
        ];

        if (function_name) code = code.replace("function_name", function_name);

        if (params) code = code.replace("parameters", params);

        if (null !== textAreaRef.current) {
          cursorPosition = textAreaRef.current.selectionStart;
          console.log(cursorPosition);
        }

        writeCode(code, commandType, commandName);
      }
    } else if (Object.keys(voiceCommands).includes(commandType)) {
      setText(
        " generate tag command is activated now. please say tag name to generate that tag, or,  say cancel to cancel the command"
      );
      speak({
        text: " generate tag command is activated now. please say tag name to generate that tag, or,  say cancel to cancel the command",
      });
    } else {
      if (command.replace(".", "") === "cancel") {
        setText("cancelled generate tag command!");
        speak({ text: "cancelled generate tag command!" });
        setGenerateTag(false);
      } else {
        if (command.length > 2) {
          writeCode(
            (voiceCommands as any)["tag"].code[
              (voiceCommands as any)["tag"].commands.indexOf("generate tag")
            ].replaceAll("tag", command.replace(".", "")),
            "tag",
            "generate tag"
          );
          setGenerateTag(false);
        }
      }
    }
  };

  recognition.onend = () => {
    if (!isMuted) {
      recognition.start();
    } else {
      setIsStarted(false);
      setIsMuted(true);
      recognition.stop();
    }
  };
  return (
    <div
      className="float-voice-btn flex items-center justify-center rounded-full"
      style={{ zIndex: 99 }}
    >
      <div
        className={`mic-container-float  text-white ${
          !isMuted ? "bg-blue-500" : "bg-red-500"
        } w-100 h-100 relative flex items-center justify-center  rounded-full`}
        onClick={handleMute}
      >
        {(isSpeaking || speaking) && text && (
          <p className=" float-text  pr-4 pl-2 text-black absolute right-3/4">
            {text}
          </p>
        )}
        <i
          className="fas fa-microphone-alt  text-white"
          style={{ fontSize: "1rem" }}
        ></i>
        <div
          className={`${
            (speaking || isSpeaking) && text ? "speaking3" : "d-none"
          }`}
        ></div>
        <div
          className={`${
            (speaking || isSpeaking) && text ? "speaking4" : "d-none"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
