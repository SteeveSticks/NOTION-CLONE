import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LiveBlocksProvider>{children}</LiveBlocksProvider>
    </div>
  );
};

export default PageLayout;
