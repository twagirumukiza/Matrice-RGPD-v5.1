# Matrice de conformité RGPD — V5.2

Application statique prête pour GitHub Pages.

## Parcours commercial

- diagnostic express gratuit, sans inscription ;
- auto-évaluation complète contre coordonnées et consentement ;
- analyse personnalisée tarifée selon l’effectif : 290 €, 490 €, 790 € HT ou sur devis ;
- demande qualifiée d’audit RGPD fondé sur des preuves ;
- offre de licence / marque blanche à partir de 490 € par an ;
- prise de rendez-vous et demandes par e-mail.

La version reste 100 % statique : les réponses et coordonnées sont conservées dans le navigateur. Une demande n’est transmise que lorsque le visiteur envoie le message ouvert dans sa messagerie.

## Paiement Stripe (optionnel)

Les tarifs standards sont de 290 € HT pour 1–9 salariés, 490 € HT pour 10–49 salariés et 790 € HT pour 50–249 salariés. À partir de 250 salariés, l’analyse est proposée sur devis. Les boutons fonctionnent actuellement comme des demandes commerciales par e-mail. Pour automatiser le paiement, reliez chaque tranche à son Stripe Payment Link dans `app.js`.

## Fonctions conservées

- interface français / anglais ;
- thèmes clair / sombre ;
- tailles A− / A / A+ ;
- rapport PDF professionnel en deux parties : réponses détaillées puis plan d’action opérationnel ;
- distinction explicite entre Conforme, Partiellement conforme, Non conforme, N/A et Non renseignée ;
- pour chaque action : écart, recommandation, explication simple, résultat attendu, preuves et critère de clôture ;
- mentions légales et politique de confidentialité ;
- identité légale à jour : SIREN, SIRET, adresse et code APE.

## Déploiement

Placez tous les fichiers à la racine du dépôt. Dans **Settings > Pages**, sélectionnez **Deploy from a branch**, branche **main**, dossier **/(root)**.
