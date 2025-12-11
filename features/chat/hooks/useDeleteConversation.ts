import { useMutation } from "@tanstack/react-query";

export function useDeleteConversation() {
  return useMutation({
    mutationKey: ["deleteConversation"],
    mutationFn: async (conversationId: string) => {
      const res = await fetch(`/api/conversation/delete`, {
        method: "POST",
        body: JSON.stringify({ conversationId }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete conversation");
      }
      return res.json();
    },
  });
}
