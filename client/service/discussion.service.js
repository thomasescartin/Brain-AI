import { apiFetch } from "./api";

export function getDiscussions() {
  return apiFetch("/discussion");
}

export function createDiscussion(discussion) {
  return apiFetch("/discussion", {
    method: "POST",
    body: JSON.stringify(discussion),
  });
}

export function updateDiscussion(id, discussion) {
  return apiFetch(`/discussion/${id}`, {
    method: "PUT",
    body: JSON.stringify(discussion),
  });
}

export function deleteDiscussion(id) {
  return apiFetch(`/discussion/${id}`, {
    method: "DELETE",
  });
}
