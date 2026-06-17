# language: fr
Fonctionnalité: Gestion de la Todo List
  En tant qu'utilisateur de l'application
  Je veux pouvoir gérer mes tâches quotidiennes
  Afin de ne rien oublier

  Contexte:
    Étant donné que je suis sur la page d'accueil de la Todo List

  Scénario: Ajouter une nouvelle tâche
    Quand je saisis "Acheter du pain" dans le champ d'ajout
    Et que je valide l'ajout de la tâche
    Alors la tâche "Acheter du pain" doit apparaître dans la liste des tâches
    Et le compteur de tâches restantes doit indiquer "1"

  Scénario: Marquer une tâche comme terminée
    Étant donné que j'ai ajouté la tâche "Faire la vaisselle"
    Quand je coche la case de la tâche "Faire la vaisselle"
    Alors la tâche "Faire la vaisselle" doit être visuellement marquée comme terminée
    Et le compteur de tâches restantes doit indiquer "0"

  Scénario: Filtrer les tâches actives
    Étant donné que j'ai ajouté la tâche "Sortir le chien"
    Et que j'ai ajouté la tâche "Payer les factures"
    Et que je coche la case de la tâche "Sortir le chien"
    Quand je clique sur le filtre "Actives"
    Alors je dois voir uniquement la tâche "Payer les factures"
    Et je ne dois pas voir la tâche "Sortir le chien"

  Scénario: Filtrer les tâches terminées
    Étant donné que j'ai ajouté la tâche "Sortir le chien"
    Et que j'ai ajouté la tâche "Payer les factures"
    Et que je coche la case de la tâche "Sortir le chien"
    Quand je clique sur le filtre "Terminées"
    Alors je dois voir uniquement la tâche "Sortir le chien"
    Et je ne dois pas voir la tâche "Payer les factures"

  Scénario: Supprimer les tâches terminées (Clear completed)
    Étant donné que j'ai ajouté la tâche "Tâche 1"
    Et que j'ai ajouté la tâche "Tâche 2"
    Et que j'ai ajouté la tâche "Tâche 3"
    Et que je coche les tâches "Tâche 1" et "Tâche 3"
    Quand je clique sur le bouton "Effacer les tâches terminées"
    Alors les tâches "Tâche 1" et "Tâche 3" ne doivent plus exister dans la liste
    Mais la tâche "Tâche 2" doit toujours être présente