(function () {
  async function request(action, payload = {}) {
    const config = window.RGPD_CONFIG;

    if (!config?.apiUrl || !config?.publishableKey) {
      throw new Error("Configuration Supabase absente.");
    }

    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": config.publishableKey
      },
      body: JSON.stringify({
        action,
        ...payload
      })
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.error || "La demande n’a pas pu être enregistrée.");
    }

    return result;
  }

  window.RGPD_API = {
    health: () => request("health"),

    createLead: (data) =>
      request("create_lead", data),

    saveAssessment: (data) =>
      request("save_assessment", data),

    createCommercialRequest: (data) =>
      request("create_commercial_request", data)
  };
})();
