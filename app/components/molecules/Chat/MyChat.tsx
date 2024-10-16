"use client";
import React from "react";

import useChatLogic from "./helpers/useChatLogic";
import useBodyScrollLock from "@/app/lib/hooks/useBodyScrollLock";
import { IconButton } from "../IconButton/IconButton";
import { UserPreviewList } from "../UserPreviewList/UserPreviewList";
import { ChatModal } from "../ChatModal/ChatModal";
import useProfile from "@/app/lib/hooks/services/useProfile";
import { ChatIcon } from "../../icons/ChatIcon";

const Chat: React.FC = () => {
  const {
    showChat,
    setShowChat,
    showPreview,
    chatName,
    lastSeen,
    countdown,
    messages,
    chatPreviewUsers,
    showChatInterface,
    backToChatList,
    closePreviewList,
    sendMessage,
    sendingStatus,
    currentReceiverId,
    chatApiLoading,
  } = useChatLogic();
  useBodyScrollLock(showChat);
  const { profile: activeChatUserProfile } = useProfile(currentReceiverId);

  return (
    <>
      {!showChat && (
        <IconButton
          onClick={() => setShowChat(true)}
          bgColor="bg-gray-600 mr-2 "
          width="w-8"
          height="h-8"
          icon={<ChatIcon />}
        />
      )}
      <div className="fixed end-6 bottom-6 group z-50">
        {showChat && <div className="fixed inset-0 bg-black opacity-50 z-30" />}
        {showChat && !showPreview && (
          <ChatModal
            chatName={chatName}
            lastSeen={lastSeen}
            backToChatList={backToChatList}
            countdown={countdown}
            messages={messages}
            sendMessage={sendMessage}
            sendingStatus={sendingStatus}
            showingChatUserId={currentReceiverId}
            activeChatUserProfile={activeChatUserProfile}
            chatApiLoading={chatApiLoading}
            closeChat={closePreviewList}
          />
        )}
        {showChat && showPreview && (
          <UserPreviewList
            chatPreviewUsers={chatPreviewUsers}
            closePreviewList={closePreviewList}
            showChatInterface={showChatInterface}
            chatApiLoading={chatApiLoading}
          />
        )}
      </div>
    </>
  );
};

export default Chat;
