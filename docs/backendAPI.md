# Documentation API backend

Path | GET | POST | PUT | DELETE
--- | --- | --- | --- | --- | 
/consumers | **CR200** Liste tous les consommateurs | **CR201** *ou* **CR304** Créer un nouveau consommateur | **CR405** | **CR200** Supprime tous les consommateurs
/producers | **CR200** Liste tous les producteurs | **CR201** *ou* **CR304** Créer un nouveau producteur | **CR405** | **CR200** Supprime tous les producteurs
/organizer | **CR200** Information de l'organisateur | **CR201** Créer un nouvel organisateur qui n'a pas de compte | **CR200** Attribue l'utilisateur en tant qu'organisateur à partir de l'email passé dans le paramètre **data** | **CR200** Supprime l'organisateur
/consumers/:id | **CR200** Donne les informations associées au consommateur | **CR405** | **CR200** Modifie les informations associées au consommateur | **CR200** Supprime le consommateur
/producers/:id | **CR200** Donne les informations associées au producteur | **CR405** | **CR200** Modifie les informations associées au producteur | **CR200** Supprime le producteur
/producers/proposals | **CR200** Liste de toutes les propositions proposées aux consommateurs | **CR405** | **CR405** | **CR405**
/producers/:id/proposals | **CR200** Liste tous les contrats que propose le producteur | **CR201** Créer une proposition avec les informations passée dans le paramètre **data** en JSON | **CR405** | **CR200** Supprime toutes les propositions que propose le producteur
/producers/:id/contracts | **CR200** Renvoie la liste des contrats liés au producteur | **CR405** | **CR405** | **CR405**
/producers/:id/proposals/:pid | **CR200** Renvoie les informations associées à la proposition que propose le producteur | **CR405** | **CR405** | **CR200** Supprime le contrats proposé par le producteur
/consumers/:id/proposals/:pid | **CR405** | **CR201** Signe un contrat dont les informations sont passées dans le paramètre **data** | **CR405** | **CR405**
/consumers/:id/contracts | **CR200** Liste tous les contrats que possède le consommateur | **CR405** | **CR405** | **CR200** Supprime tous les contrats du consommateur
/consumers/:id/contracts/:cid | **CR200** Renvoie les informations du contrat *cid* | **CR405** | **CR405** | **CR200** Supprime le contrat *cid*
/producers/:id/contracts/:cid | **CR405** | **CR405** | **CR200** Valide le contrat référencé par *cid* | **CR405**
/consumers/active | **CR200** Liste des consommateurs actifs pour les 4 semaines suivantes | **CR405** | **CR405** | **CR405** 
/consumers/available | **CR200** Liste des consommateurs actifs disponibles pour les 4 seamines suivantes | **CR405** | **CR405** | **CR405** 
/consumers/permanence | **CR200** Binômes des consommateurs de permanence pour les 4 seamines suivantes | **CR405** | **CR405** | **CR405**
/consumers/:id/active | **CR200** Donne les semaines actives pour le consommateur donné pour les 4 semaines suivantes | **CR405** | **CR405** | **CR405**
/consumers/:id/available | **CR200** Donne les semaines de disponbilité pour le consommateur donné pour les 4 semaines suivantes | **CR405** | **CR200** Met le consommateur à disponible à la date passé dans le paramètre **data** | **CR200** Met le consommateur à indisponible à la date passé en paramètre
/consumers/:id/permanence | **CR200** Donne les semaines de permanence pour le consommateur donné pour les 4 semaines suivantes | **CR200** Met le consommateur en permanence à la date passé dans le paramètre **data** | **CR200** Enlève la permanence du consommateur à la date passé en paramètre | **CR405**
/login | **CR200** Renvoie si la personne est connectée ou non | **CR200** *ou* **CR403** Se connecte si la personne est autorisée ou renvoie une erreur sinon | **CR200** Modifie le mot de passe de la personne | **CR200** Supprime le compte de la personne
