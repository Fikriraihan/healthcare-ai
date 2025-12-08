"use server";

import { createSupabaseClient } from "../supabase";

export const createChat = async () => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("TEST")
    .insert({ title: "CREATED BY USER lagi" })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create TEST");

  return data;
};

export const getMessages = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });
  if (error) console.error("FR: Supabase select error:", error);
  return data;
};
