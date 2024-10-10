"use client";
import React from "react";

import useChatLogic from "./useChatLogic";
import useAnimateToggle from "@/app/lib/hooks/useAnimateToggle";
import useBodyScrollLock from "@/app/lib/hooks/useBodyScrollLock";
import { ChatButton } from "../ChatButton/ChatButton";
import { UserPreviewList } from "../UserPreviewList/UserPreviewList";
import { ChatModal } from "../ChatModal/ChatModal";
import useProfile from "@/app/lib/hooks/services/useProfile";

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
  const animate = useAnimateToggle();
  useBodyScrollLock(showChat);
  const { profile: activeChatUserProfile } = useProfile(currentReceiverId);

  return (
    <div className="fixed end-6 bottom-6 group">
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
      {!showChat && (
        <ChatButton onClick={() => setShowChat(true)} animate={animate} />
      )}
    </div>
  );
};

export default Chat;
