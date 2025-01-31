// TODO, these are copied from the backend, but we should set up a monorepo or shared library later
/*
    WEBSOCKET MESSAGE TYPES
*/
export type WSMessageInputType =
  | "subscribe_room"
  | "unsubscribe_room"
  | "public_chat"
  | "heartbeat"
  | "system_notification";

export type WSMessageOutputType =
  | "system_notification"
  | "public_chat"
  | "heartbeat"
  | "ai_chat"
  | "gm_action"
  | "pvp_action";

export interface WSMessageInput {
  type: WSMessageInputType;
  timestamp?: number;
  signature?: string;
  author?: number;
  chainId?: number;
  content: {
    roomId?: number;
    roundId?: number;
    text?: string;
  };
}

export interface WSMessageOutput {
  type: WSMessageOutputType;
  timestamp: number;
  signature: string;
  content:
    | PublicChatContent
    | AIChatContent
    | GMMessageContent
    | PVPMessageContent;
  error?: string;
}

export interface PublicChatContent {
  message_id: number;
  author: number;
  roomId: number;
  roundId: number;
  text: string;
  timestamp: number;
}

export interface SystemNotificationContent {
  text: string;
  error: boolean;
  originalMessage?: any;
}

export interface AIChatContent {
  actor: string; // The blockchain address of the AI agent who sent the message
  sent: number; // UTC timestamp in milliseconds when message was sent to backend
  originalContent?: {
    // Original message content before any modifications. Will be empty and should be ignored if message was not altered.
    text: string;
  };

  content: {
    // Current message content. If the message was altered, this will be the altered version. Supports text initially, will be expanded to support full Eliza Message type later
    text: string;
  };
  timestamp: number;
  altered: boolean; // Indicates if message was modified by PVP actions. When present, app can render a different UI for the message
}

export interface PVPMessageContent {
  txHash: string;
  roomId: number;
  roundId: number;
  instigator: string; // The address of the person who took the action
  //Silence = mute agent from sending messages, Deafen = block agent from receiving messages, Attack = Direct DM, Poison = Alter agent messages
  actionType: "Silence" | "Deafen" | "Attack" | "Poison";
  targets: string[]; // addresses of agents the action is being taken on
  additionalData: object;
}

export interface GMMessageContent {
  gm_id: string; //Address of the GM taking the action TODO change to addresslike
  content: {
    text: string;
  }; // The content of the GM message, typically describes the action being taken. Can support just text initially, eventually need to support full message type
  targets: string[]; // If the GM is taking action against a specific agent, like kicking them or forcing a decision, the targets will appear here.
  timestamp: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeartbeatContent {}

