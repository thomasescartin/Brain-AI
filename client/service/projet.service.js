import { apiFetch } from "./api";

export function getProjets() {
  return apiFetch("/projet");
}

export function createProjet(projet) {
  return apiFetch("/projet", {
    method: "POST",
    body: JSON.stringify(projet),
  });
}
