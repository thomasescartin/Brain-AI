import { apiFetch } from "./api";

export function getEvenements() {
  return apiFetch("/evenement");
}

export function createEvenement(evenement) {
  return apiFetch("/evenement", {
    method: "POST",
    body: JSON.stringify(evenement),
  });
}

export function updateEvenement(id_evenement, evenement) {
  return apiFetch(`/evenement/${id_evenement}`, {
    method: "PUT",
    body: JSON.stringify(evenement),
  });
}

export function deleteEvenement(id_evenement) {
  return apiFetch(`/evenement/${id_evenement}`, {
    method: "DELETE",
  });
}
