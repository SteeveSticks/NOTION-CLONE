import { useRoom } from "@liveblocks/react/suspense";
import React from "react";

const Editor = () => {
  const room = useRoom();
  return (
    <div className="max-w-5xl mx-auto">
      <div>
        {/* TODO TranslateDocument AI */}
        {/* TODO ChatToDocument AI*/}

        {/* Dark Mode */}
      </div>

      {/* BlockNote */}
    </div>
  );
};

export default Editor;
