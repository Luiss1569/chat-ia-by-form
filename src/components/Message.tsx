"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Message } from "ai/react";
import { Skeleton as SkeletonShadcn } from "./ui/skeleton";

interface MessageProps {
  message: Readonly<Message>;
}

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  return (
    <div key={message.id} className="flex gap-3 text-slate-600 text-sm mb-4">
      {message.role === "user" && (
        <Avatar>
          <AvatarFallback>Big Rick</AvatarFallback>
          <AvatarImage src="https://github.com/Luiss1569.png" />
        </Avatar>
      )}
      {message.role === "assistant" && (
        <Avatar>
          <AvatarFallback>IA</AvatarFallback>
          <AvatarImage src="https://github.com/openia.png" />
        </Avatar>
      )}
      <p className="leading-relaxed">
        <span className="block font-bold text-slate-700">
          {message.role === "user" ? "Eu" : "BigBrain"}
        </span>
        {message.content}
      </p>
    </div>
  );
};

export default MessageItem;

export const Skeleton: React.FC = () => {
  return (
    <div className="flex gap-3 text-slate-600 text-sm mb-4">
      <SkeletonShadcn className="h-10 w-10 rounded-full bg-slate-300" />

      <p className="leading-relaxed">
        <span className="block font-bold text-slate-300">
          <SkeletonShadcn className="h-4 w-[50px] bg-slate-300" />
        </span>
        <div className="space-y-2 mt-2">
          <SkeletonShadcn className="h-4 w-[250px] bg-slate-300" />
          <SkeletonShadcn className="h-4 w-[200px] bg-slate-300" />
        </div>
      </p>
    </div>
  );
};
