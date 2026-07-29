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

export function updateProjet(id_projet, projet) {
  return apiFetch(`/projet/${id_projet}`, {
    method: "PUT",
    body: JSON.stringify(projet),
  });
}
