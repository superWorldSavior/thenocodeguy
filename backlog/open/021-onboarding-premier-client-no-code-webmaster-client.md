---
id: 21
title: "Onboarding premier client — No Code Webmaster (client existant Stripe)"
priority: high
size: M
labels: []
---

## Description
Erwan a déjà un client Stripe avec un abonnement pour maintenance de site. Ce client sera le premier test du No Code Webmaster. 

Steps 

Collecter infos client (site, stack, accès, besoins) 

Déployer agent webmaster (openclaw agents add) 

Configurer monitoring (uptime, analytics, error alerts) 

Connecter WhatsApp du client 

Migrer abo Stripe vers le pricing TNCG si applicable 

Documenter le process pour les clients suivants 
 

AC 

Agent webmaster déployé et fonctionnel pour ce client 

Client reçoit des rapports via WhatsApp 

Monitoring uptime actif 

Process documenté dans docs/ONBOARDING.md 
 

Dépendances 

PBI #64 (persona webmaster) — devrait être done avant 

PBI #65 (workflows webmaster) — au moins le monitoring 

Infos Stripe + client à obtenir auprès Erwan

## Acceptance Criteria
- Given an existing Stripe customer with an active site-maintenance subscription, when the onboarding checklist is opened, then it contains all required fields: site URL, tech stack, CMS/hosting access credentials, WhatsApp number, and a free-text field for specific maintenance needs — and the form cannot be submitted until every required field is filled.
- Given the client info form is completed, when the operator runs `openclaw agents add` with the collected parameters, then a new Webmaster agent instance is created, its status is "active" in the OpenClaw dashboard, and the agent's configuration references the correct site URL and stack.
- Given a deployed Webmaster agent, when monitoring is configured, then uptime checks ping the client site every 5 minutes, Umami analytics tracking is verified by at least one recorded pageview, and error-alert rules (5xx, SSL expiry < 14 days, DNS failure) are created and send notifications to the operator's WhatsApp.
- Given the client's WhatsApp number is provided, when the WhatsApp channel is connected, then the client receives an automated welcome message from the Webmaster agent within 60 seconds, and subsequent client messages are routed to the agent and logged in the conversation history.
- Given all onboarding steps are completed for this first client, then a Markdown runbook exists at `/workspace/docs/onboarding-webmaster.md` containing: prerequisites, step-by-step instructions with CLI commands, expected outputs for each step, and a troubleshooting section — and every CLI command in the runbook executes without error on a clean environment.
