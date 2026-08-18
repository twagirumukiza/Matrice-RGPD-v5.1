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
        apikey: config.publishableKey
      },
      body: JSON.stringify({
        action,
        ...payload
      })
    });

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error("Réponse incorrecte du serveur.");
    }

    if (!response.ok || result.success === false) {
      throw new Error(
        result.error ||
        "La demande n’a pas pu être enregistrée."
      );
    }

    return result;
  }

  window.RGPD_API = {
    health() {
      return request("health");
    },

    createLead(data) {
      return request("create_lead", data);
    },

    saveAssessment(data) {
      return request("submit_assessment", data);
    },

    createCommercialRequest(data) {
      return request(
        "create_commercial_request",
        data
      );
    }
  };
})();
