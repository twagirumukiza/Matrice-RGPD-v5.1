(function () {
  function normaliseCompanySize(value) {
    const sizes = {
      micro: "1-9",
      small: "10-49",
      medium: "50-249",
      large: "250+",
      "1–9": "1-9",
      "10–49": "10-49",
      "50–249": "50-249",
      "1-9": "1-9",
      "10-49": "10-49",
      "50-249": "50-249",
      "250+": "250+"
    };

    return sizes[value] || undefined;
  }

  function addCompanySizeField() {
    document
      .querySelectorAll(".commercial-dialog")
      .forEach(function (form) {
        if (
          form.elements.size ||
          form.classList.contains("pricing-dialog")
        ) {
          return;
        }

        const grid = form.querySelector(".lead-grid");

        if (!grid) {
          return;
        }

        const label = document.createElement("label");

        label.innerHTML = `
          Taille de l’entreprise / Company size *
          <select name="size" required>
            <option value="">Sélectionner / Select</option>
            <option value="1-9">1 à 9 salariés</option>
            <option value="10-49">10 à 49 salariés</option>
            <option value="50-249">50 à 249 salariés</option>
            <option value="250+">250 salariés et plus</option>
          </select>
        `;

        grid.appendChild(label);
      });
  }

  const companySizeObserver = new MutationObserver(
    addCompanySizeField
  );

  companySizeObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  addCompanySizeField();

  
  document.addEventListener(
    "submit",
    function (event) {
      const form = event.target;

      if (
        !(form instanceof HTMLFormElement) ||
        !form.matches(".commercial-dialog")
      ) {
        return;
      }

      const fields = new FormData(form);
      const professionalEmail = String(fields.get("email") || "").trim();

      if (!professionalEmail) {
        return;
      }

      const isAnalysis = form.classList.contains("pricing-dialog");
      const isAudit = Boolean(fields.get("deadline"));
      const companySize = normaliseCompanySize(fields.get("size"));

      const leadPayload = {
        fullName: String(fields.get("name") || "").trim(),
        professionalEmail,
        organisation: String(fields.get("org") || "").trim(),
        roleTitle: String(fields.get("role") || "").trim(),
        contactConsent: Boolean(fields.get("consent")),
        marketingConsent: Boolean(fields.get("marketing")),
        source: "github-pages-v5.1"
      };

      if (companySize) {
        leadPayload.companySize = companySize;
      }

      window.RGPD_API
        .createLead(leadPayload)
        .then(async function (leadResult) {
          console.info("Prospect enregistré :", leadResult.leadId);

          if (!isAnalysis && !isAudit) {
            return;
          }

          const commercialPayload = {
            leadId: leadResult.leadId,
            requestType: isAnalysis ? "analysis" : "audit",
            contextText: String(fields.get("context") || "").trim()
          };

          if (companySize) {
            commercialPayload.companySize = companySize;
          }

          const requestResult =
            await window.RGPD_API.createCommercialRequest(
              commercialPayload
            );

          console.info(
            "Demande commerciale enregistrée :",
            requestResult.requestId
          );
        })
        .catch(function (error) {
          console.error("Enregistrement Supabase impossible :", error);

          const message = form.querySelector(".form-note");

          if (message) {
            message.textContent =
              "La demande peut être envoyée par e-mail, mais son enregistrement automatique a échoué.";
          }
        });
    },
    true
  );
})();
