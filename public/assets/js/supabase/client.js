(function () {
  let client = null;

  function getSupabaseClient() {
    if (client) return client;

    if (!window.supabase) {
      console.error("[Supabase] Biblioteca não carregada");
      return null;
    }

    const config = window.SUPABASE_CONFIG;

    if (!config || !config.url || !config.anonKey) {
      console.error("[Supabase] Configuração inválida");
      return null;
    }

    client = window.supabase.createClient(config.url, config.anonKey);
    return client;
  }

  window.getSupabaseClient = getSupabaseClient;
})();
