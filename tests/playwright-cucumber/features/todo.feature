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