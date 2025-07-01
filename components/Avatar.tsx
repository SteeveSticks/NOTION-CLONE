"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";

const Avatars = () => {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others].filter(Boolean);
  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">User currently editing this page</p>

      <div className="flex -space-x-3">
        {all.map((other, i) => (
          <Tooltip key={other?.id + i}>
            <TooltipTrigger>
              <Avatar className="border-2 hover:z-50">
                <AvatarImage src={other?.info.avatar} />
                <AvatarFallback>{other?.info.name}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{self?.id === other?.id ? "You" : other?.info.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Avatars;
