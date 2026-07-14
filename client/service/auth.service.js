import { apiFetch } from "./api";

export function login(email, mot_de_passe) {
  return apiFetch("/utilisateurs/login", {
    method: "POST",
    body: JSON.stringify({ email, mot_de_passe }),
  });
}

export function register(utilisateur) {
  return apiFetch("/utilisateurs/register", {
    method: "POST",
    body: JSON.stringify(utilisateur),
  });
}

export function me() {
  return apiFetch("/utilisateurs/me");
}

export function update(utilisateur) {
  return apiFetch("/utilisateurs/update", {
    method: "PUT",
    body: JSON.stringify(utilisateur),
  });
}
