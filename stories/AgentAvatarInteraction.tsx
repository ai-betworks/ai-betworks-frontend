"use client";

import { Dialog } from "@/components/ui/dialog";
import { Tables } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AgentAvatar } from "./AgentAvatar";
import { BuyHoldPlaceBetDialog } from "./BuyHoldPlaceBetDialog";
import { PvpActionDialog } from "./PVPActionDialog";
import { PvpStatusEffects } from "./PvpStatusEffects"; // ADDED: Import new component

interface AgentAvatarInteractionProps {
  name: string;
  borderColor: string;
  imageUrl?: string;
  betAmount: number; // initial/default bet amount in SOL
  betType?: "buy" | "hold" | "sell" | null; // initial bet type if any
  agentAddress: string;
  roomData: Tables<"rooms">;
  isRoundTimerExpired: boolean;
  pvpStatuses: {
    verb: string;
    instigator: string;
    endTime: number;
    parameters: string;
  }[]; // ADDED: statuses from contract
}

const betTypeMap = {
  buy: 1,
  hold: 2,
  sell: 3,
};

export function AgentAvatarInteraction({
  name,
  borderColor,
  imageUrl,
  betAmount,
  betType,
  agentAddress,
  roomData,
  pvpStatuses, // ADDED
  isRoundTimerExpired,
}: AgentAvatarInteractionProps) {
  const [selectedBetType, setSelectedBetType] = useState<
    "buy" | "hold" | "sell" | null
  >(betType || null);

  return (
    <Dialog>
      <div className="group relative">
        <AgentAvatar
          name={name}
          disableLink={true}
          borderColor={borderColor}
          imageUrl={imageUrl}
          variant="lg"
          className={cn(
            "transition-opacity",
            selectedBetType ? "opacity-70" : "",
            isRoundTimerExpired ? "opacity-50" : "" // ADDED: Visual feedback for disabled state
          )}
        />
        {/* ADDED: Show PVP badges next to the avatar */}
        <PvpStatusEffects statuses={pvpStatuses} />
        {/* MODIFIED: Conditionally render controls based on round state */}
        {!isRoundTimerExpired && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-8">
              <BuyHoldPlaceBetDialog
                name={name}
                borderColor={borderColor}
                imageUrl={imageUrl}
                betAmount={betAmount}
                betType={betType}
                agentAddress={agentAddress}
                roomData={roomData}
                trigger={
                  <button className="z-20 px-4 py-1 text-gray-200 text-xs font-semibold rounded-full transform -translate-x-8 hover:-translate-x-6 transition-transform">
                    {selectedBetType ? "CHANGE BET" : "PLACE BET"}
                  </button>
                }
              />

              <PvpActionDialog
                roomData={roomData}
                agentName={name}
                agentImageUrl={imageUrl}
                borderColor={borderColor}
                agentAddress={agentAddress}
                trigger={
                  <button className="z-20 px-4 py-1 text-gray-200 text-xs font-semibold rounded-full transform translate-x-8 hover:translate-x-6 transition-transform">
                    TAKE ACTION
                  </button>
                }
              />
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
