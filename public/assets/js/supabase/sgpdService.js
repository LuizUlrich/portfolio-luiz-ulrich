import "./client.js";

const TABLE_NAME = "academic_sgpd_prototypes";

function getClient() {
  const client = window.getSupabaseClient?.();
  if (!client) {
    throw new Error("Cliente Supabase indisponível.");
  }
  return client;
}

export async function getProcesses() {
  const client = getClient();
  const { data, error } = await client
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message || "Erro ao buscar processos.");
  }

  return data || [];
}

export async function createProcess(data) {
  const client = getClient();
  const { data: created, error } = await client
    .from(TABLE_NAME)
    .insert([data])
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Erro ao criar processo.");
  }

  return created;
}

export async function updateProcess(id, updates) {
  const client = getClient();
  const { data, error } = await client
    .from(TABLE_NAME)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Erro ao atualizar processo.");
  }

  return data;
}

export async function deleteProcess(id) {
  const client = getClient();
  const { error } = await client
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message || "Erro ao excluir processo.");
  }

  return true;
}
