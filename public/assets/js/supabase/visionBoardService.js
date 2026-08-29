(function () {
  async function getGoals() {
    const client = window.getSupabaseClient();
    if (!client) return { data: [], error: "Cliente Supabase indisponível." };

    const { data, error } = await client
      .from("personal_vision_board")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[VisionBoard] Erro ao buscar:", error);
      return { data: [], error: "Falha ao carregar metas." };
    }

    return { data: data || [], error: null };
  }

  async function createGoal(goal) {
    const client = window.getSupabaseClient();
    if (!client) return { success: false, error: "Cliente Supabase indisponível." };

    const { error } = await client
      .from("personal_vision_board")
      .insert([goal]);

    if (error) {
      console.error("[VisionBoard] Erro ao salvar:", error);
      return { success: false, error: "Falha ao salvar meta." };
    }

    return { success: true, error: null };
  }

  async function deleteGoal(id) {
    const client = window.getSupabaseClient();
    if (!client) return { success: false, error: "Cliente Supabase indisponível." };

    const { error } = await client
      .from("personal_vision_board")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[VisionBoard] Erro ao deletar:", error);
      return { success: false, error: "Falha ao excluir meta." };
    }

    return { success: true, error: null };
  }

  window.VisionBoardService = {
    getGoals,
    createGoal,
    deleteGoal
  };
})();
