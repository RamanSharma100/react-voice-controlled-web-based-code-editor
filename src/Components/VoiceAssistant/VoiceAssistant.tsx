import { FunctionComponent as FC, useEffect, useState } from "react";
import { recognition } from "../../APIs/speechRecognitionAPI";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis";
import checkCommands, { ICheckCommands } from "./checkCommands";
import "./VoiceAssistant.css";

import IVoiceAssistant from "./IVoiceAssistant";

const VoiceAssistant: FC<IVoiceAssistant> = ({}: IVoiceAssistant) => {
  //   const {
  //     name: { responses },
  //   }: IVoiceCommandsDataJSON = voiceCommandsDataJSON;

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const { speak, speaking, supported } = useSpeechSynthesis({
    callbackFunctions: [setText],
  });

  useEffect(() => {
    if (!isSpeaking) {
      setIsSpeaking(false);
      // setTimeout(() => setText(""), 5000);
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
        {(isSpeaking || speaking) && (
          <p className=" float-text  pr-4 pl-2 text-black absolute right-3/4">
            {text}
          </p>
        )}
        <i
          className="fas fa-microphone-alt  text-white"
          style={{ fontSize: "1rem" }}
        ></i>
        <div
          className={`${speaking || isSpeaking ? "speaking3" : "d-none"}`}
        ></div>
        <div
          className={`${speaking || isSpeaking ? "speaking4" : "d-none"}`}
        ></div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
