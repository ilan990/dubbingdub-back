# Planning des appels API

## Phase 1 : Authentification et gestion des utilisateurs
1. POST /api/auth/register - Inscription d'un nouvel utilisateur
2. POST /api/auth/login - Connexion d'un utilisateur
3. GET /api/user/profil - Récupération du profil de l'utilisateur connecté
4. PUT /api/user/profil - Mise à jour du profil de l'utilisateur
5. POST /api/user/logout - Déconnexion d'un utilisateur

## Phase 2 : Gestion des films et des rôles
5. POST /api/films - Ajout d'un nouveau film (maison de production)
6. GET /api/films - Récupération de la liste des films
7. GET /api/films/{id} - Récupération des détails d'un film
8. POST /api/films/{id}/roles - Ajout d'un rôle à un film
9. GET /api/films/{id}/roles - Récupération des rôles d'un film
9. PUT /api/films/{id} - Mise à jour d'un film
9. DELETE /api/films/{id} - Suppression d'un film


## Phase 3 : Candidatures et contrats
10. POST /api/films/{id}/candidatures - Candidature d'un DA pour un film
11. GET /api/candidatures - Récupération des candidatures (pour les maisons de production)

12. PUT /api/candidatures/{id} - Mise à jour du statut d'une candidature
13. POST /api/contrats - Création d'un contrat (pour les DA)
14. GET /api/contrats - Récupération des contrats (pour les doubleurs et les DA)

## Phase 4 : Gestion des disponibilités et communication
15. POST /api/disponibilites - Ajout de disponibilités (pour les doubleurs)
16. GET /api/disponibilites - Récupération des disponibilités (pour les DA)
17. POST /api/messages - Envoi d'un message
18. GET /api/messages - Récupération des messages d'un utilisateur

## Phase 5 : Fonctionnalités avancées et administration
19. GET /api/stats - Récupération de statistiques (pour l'administrateur)
20. PUT /api/users/{id}/role - Modification du rôle d'un utilisateur (pour l'administrateur)
21. DELETE /api/films/{id} - Suppression d'un film (pour l'administrateur)
22. GET /api/logs - Récupération des logs système (pour l'administrateur)

## TODO
Rajout d'un champs prive sur les films et les productions peuvent décider s'ils mettent les films en pv 
Note : Le doubleurs peut voir que les Film_da pas les films de la table films
       La maison de prod peut voir que ses propres films
Les doubleurs peuvent voir les infos du films mais certains champs doivent être caché comme par exemple le budget. Tout est montré pour le moment       
Il n'y a qu'une maison de production qui peut ajouter un film
Rajouter dans la route d'acceptation de la candidature, une recherche des autres candidatures et un refus des autres candidatures
Quand la maison de production reçoit les candidatures des DA, elle peut cliquer sur le DA et voir les films qu'il a déjà réalisé