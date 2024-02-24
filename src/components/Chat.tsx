"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { useCallback, useState } from "react";
import Message, { Skeleton } from "@/components/Message";

const Chat: React.FC = () => {
  const [type, setType] = useState("help");

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { type },
      initialInput: "Olá TechBrain, como você pode me ajudar?",
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Olá, sou a TechBrain, assistente virtual da Tech4Humans. 😊🤖 Vamos começar?",
        },
      ],
    });

  const handleTypeChange = useCallback(
    (e: string) => {
      setType(e);
    },
    [setType]
  );

  return (
    <>
      <CardContent className="flex flex-col gap-4">
        <ScrollArea className="h-[550px] w-full pr-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && <Skeleton />}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Select defaultValue="help" onValueChange={handleTypeChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="answer">
                <FaPencilAlt />
              </SelectItem>
              <SelectItem value="help">
                <FaQuestion />
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Escreva sua mensagem..."
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </>
  );
};

export default Chat;
