"use client";

import { useMutation } from "@tanstack/react-query";
import sendInviteAction from "../actions/send-invite.action";

export function useSendInvite() {
  return useMutation({
    mutationFn: (data)=>sendInviteAction(data),
  });
}