# Projet AMAP

## Pourquoi cette application ?

Les Associations pour le Maintien d’une Agriculture Paysanne (AMAP) désirent informatiser l’organisation des contrats entre consommateurs et producteurs, des distributions de produits ainsi que des permanences, et mettre en place en place une application pour la gestion de l’AMAP.

Le but de l’application est de faire le lien entre les producteurs et les consommateurs en centralisant l’organisation des distributions.

## Documentation

### Installation android

1. Générez le fichier apk en vous plaçant à la racine du projet et en exécutant la ligne de commande suivante :

```cd android && ./gradlew assembleRelease```

3. Ensuite, deux solutions sont possibles : utilisation sur un téléphone android, ou alors sur un émulateur.

Si vous possédez un téléphone android, nous vous conseillons fortement la première solution, qui est très simple et permet d'avoir une expérience utilisateur bien meilleure.

***Téléphone*** :  Téléchargez le fichier apk présent dans le dossier ***./android/app/outputs/apk/release*** sur votre téléphone. Pour cela vous pouvez l'ajouter sur votre Google Drive. Attention, il faudra modifier vos paramètres de Sécurité pour autoriser les sources inconnues.

***Emulateur*** : Utilisez un émulateur android. Pour cela il faut avoir un émulateur android installé sur votre machine. Je vous redirige vers le [TP React Native](https://chamilo.grenoble-inp.fr/courses/ENSIMAG4MMCAWE6/document/tp/tpreact/tp/index.html) qui vous détaille les étapes pour une telle installation (10min maximum). Ensuite il vous suffit de vous placer à la racine du projet et de lancer les commandes suivantes dans deux terminaux différents :

```npm run startfront```

```npm run android```

### Installation iOS

L'installation sur iOS n'est pas totalement fonctionnelle. En effet, ne possédant pas d'ordinateur apple, nous avons dû essayer de faire via les runners de l'Ensimag, ce qui complique la tâche. De plus, l'utilisation de **react-native-app-auth** oblige à faire des modifications dans les fichiers du dossier *ios*.

### Démarrage

*Attention* : Pour utiliser les principales fonctionnalités de l'application, il faut avoir un compte Google (une adresse mail Google).

La base de données est déjà peuplé, il existe des propositions des producteurs, des contrats, etc. Cela vous permet de pouvoir tester toutes les fonctionnalités principales directement, soit en tant que producteur, soit en tant que consommateur. En effet, il y a deux types de compte. Mais vous pouvez avoir les deux types avec la même adresse google, pour cela enregistrez-vous deux fois: une fois en tant que consommateur, une fois en tant que producteur. 
Et lorsque vous vous connectez, choisissez quel type d'utilisateur vous voulez être. Globalement, un producteur fait des propositions et acceptent les demandes de contrat. Et un consommateur visualise les propositions, fait des demandes de contrat, indique ses disponibilités pour les permanences.


Enfin, pour les fonctionnalités de gestion planning, c'est l'organisateur seul qui a les droits. Pour pouvoir utiliser l'application en tant qu'organisateur, il faut que l'administrateur de l'application vous attribue le rôle. Par manque de temps, nous n'avons pas pu développer d'interface administrateur. 

Pour vous attribuer le rôle d'organisateur, vous pouvez le faire en exécutant la ligne de commande suivante dans un terminal, en remplaçant votre adresse mail Google : 
- ```curl -X 'DELETE' 'https://amap-web-project.herokuapp.com/organizer'```
- ```curl -X 'PUT' 'https://amap-web-project.herokuapp.com/organizer' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{"email": "YOUR_GOOGLE_ACCOUNT_EMAIL@gmail.com"}'```

Sinon, rendez vous sur la [page suivante](https://amap-web-project.herokuapp.com/doc/) qui permet de faire des requêtes sur le back. Ensuite, dans la liste des requêtes de *Organizer*, exécutez ***DELETE /organizer*** (Delete All organizers) puis exécutez ***PUT /organizer*** (Set organizer) en précisant votre adresse email à la place de celle préremplie (assurez-vous d'avoir créé votre compte avant).


Si vous souhaitez avoir davantage de détails concernant les différents rôles et l'utilisation de l'application je vous renvoie vers le [Manuel utilisateur](docs/userManual.md).

Si vous avez des problèmes pour vous connecter avec l'API Google, essayez de changer d'émulateur android. Si cela ne marche toujours pas, contactez-nous par mail : hugo.dabadie@grenoble-inp.org.


### Tests

#### Tests backend

Pour lancer les tests, il vous suffit de vous placer à la racine du projet et de lancer la commande suivante :

```npm run testback```


#### Tests fonctionnels

Nous avons passé plusieurs heures à essayer d'installer Detox pour effectuer des tests E2E. Malheureusement, nous avons dû abandonné l'idée. Les fichiers du module Detox renvoyaient des erreurs. Nous avons essayé d'utiliser les runners jest et mocha.


### Backend

Le backend est spécifié par le tableau suivant :
- [Documentation API](docs/backendAPI.md)


### Authentification

Des détails sur la mise en place de l'authentification sont présents dans le lien suivant :
- [Documentation authentification](docs/authentication.md)