import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const supabase = createSupabaseClient();

    const body = await req.json();
    const { conversationId } = body;

    const { data: conversations } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId)
      .eq("user_id", userId);

    return new Response(JSON.stringify(conversations));
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new Response("Failed to fetch conversations", { status: 500 });
  }
}
