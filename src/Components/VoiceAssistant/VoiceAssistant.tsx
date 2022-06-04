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
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  let cursorCurrentPosition = 0;

  const { speak, speaking, supported } = useSpeechSynthesis({
    callbackFunctions: [setText, setIsSpeaking],
  });

  useEffect(() => {
    if (speaking) {
      setIsSpeaking(true);
      //   setTimeout(() => setText(""), 5000);
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

  // recognition

  recognition.onstart = () => {
    setIsMuted(false);
    setIsStarted(true);
  };

  recognition.onresult = (event: any) => {
    const command = event.results[0][0].transcript.toLowerCase();

    const { commandAction, commandType, commandName }: ICheckCommands =
      checkCommands(command);

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
