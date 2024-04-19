import React from "react";
import SidebarContainer from "../../components/sidebar/SidebarContainer";
import MessageContainer from "../../components/messages/MessageContainer";
function Home() {
  return (
    <div className="flex  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 h-screen w-screen">
      <SidebarContainer />
      <MessageContainer />
    </div>
  );
}

export default Home;
