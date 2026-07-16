# Brain_AI – Réseau Social autour de l'Intelligence Artificielle

## Description

Brain_AI est un réseau social dédié aux passionnés et professionnels de l’intelligence artificielle.
Il permet aux utilisateurs de créer un compte, participer à des discussions, commenter des contenus et interagir avec une communauté autour de thématiques technologiques.

Le projet a été conçu dans une logique d’apprentissage et de mise en pratique des technologies web modernes, en mettant l’accent sur l’architecture backend, la sécurité et l’expérience utilisateur.

---

## Fonctionnalités principales

### Utilisateurs

- Inscription et connexion sécurisée
- Authentification via JWT
- Gestion du profil utilisateur
- Modification des informations (email, mot de passe, rôle, avatar)
- Suppression du compte

### Discussions

- Création de discussions
- Affichage des discussions
- Modification et suppression
- Association à un utilisateur

### Commentaires

- Ajout de commentaires sur une discussion
- Affichage des commentaires
- Modification et suppression
- Relation avec utilisateur et discussion

---

## Technologies utilisées

### Frontend

- React
- JavaScript
- HTML5 / CSS3

### Backend

- Node.js
- Express.js

### Base de données

- MySQL

### Sécurité

- JWT (authentification)
- Argon2 (hachage des mots de passe)
- Helmet (sécurité HTTP)
- Express-rate-limit (protection contre les attaques)

### Outils

- dotenv (gestion des variables d’environnement)
- cors (gestion des requêtes cross-origin)

---

## Architecture du projet

Le backend suit une architecture en couches :

- **Routes** : gestion des endpoints API
- **Contrôleurs** : logique métier et validation des données
- **Modèles** : requêtes SQL et accès à la base de données

Cette organisation permet :

- une meilleure lisibilité
- une maintenance facilitée
- une évolution du projet plus simple

---

## Base de données

La base de données repose sur un modèle relationnel structuré comprenant les tables suivantes :

- utilisateurs
- rôles
- discussions
- commentaires
- événements
- projets
- connexion

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-repo/brain_ai.git
```

### 2. Installer les dépendances

Pour installer Node.js

```bash
npm init -y
```

Pour installer React

```bash
npm create vite@latest frontend
```

Les différentes bibliothèques

```bash
npm install express cors dotenv jsonwebtoken argon2 mysql2 express-rate-limit helmet react-icons
```

### 3. Configurer les variables d’environnement

Créer un fichier `.env` :

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=******
DB_NAME=Brain_AI

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1h
```

### 4. Lancer le serveur

```bash
node serveur.js
```

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre d’un apprentissage du développement web full-stack.

---
