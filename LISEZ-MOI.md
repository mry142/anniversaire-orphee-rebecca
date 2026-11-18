# Invitation digitale 30 ans · Vintage Rosé

## Contenu du dossier
- `index.html`, `style.css`, `script.js` : le site
- `images/` : vos photos (photo1.jpg à photo11.jpg) et `og.jpg` (aperçu WhatsApp)
- `musique/` : déposez-y `musique.mp3`

## 1. Les 3 emplacements à remplir (tout en haut de `script.js`)
1. `formUrl` : le lien de votre Google Forms (étape 2)
2. `musique` : chemin de votre fichier audio (par défaut `musique/musique.mp3`)
3. `photos` : la liste des photos de la galerie. Pour en ajouter, copiez la photo dans `images/` et ajoutez une ligne.

## 2. Créer le Google Forms
1. Allez sur https://forms.google.com et créez un formulaire vierge.
2. Titre : « Mes 30 ans · Confirmation de présence ».
3. Ajoutez ces questions :
   - **Nom et prénoms** : réponse courte, obligatoire
   - **Numéro de téléphone** : réponse courte, obligatoire
   - **Serez-vous présent(e) ?** : choix multiple, obligatoire, avec « Oui, je serai présent(e) » et « Non, je ne pourrai pas être présent(e) »
   - **Nombre de personnes accompagnantes** : liste déroulante (0, 1, 2…), selon ce que vous autorisez
4. Cliquez sur **Envoyer** > icône lien > **Copier**. Collez ce lien dans `formUrl` de `script.js`, entre les guillemets.
5. Dans le formulaire, n'ajoutez aucun collaborateur : il reste privé, seuls vous en avez la gestion.

## 3. Récupérer les réponses dans Google Sheets
1. Dans le formulaire, onglet **Réponses** > **Associer à Sheets** > **Créer une feuille de calcul**.
2. Chaque réponse arrive automatiquement dans cette feuille.
3. Ne partagez **jamais** cette feuille : elle reste accessible uniquement à votre compte, pas aux invités.
4. Ajoutez un onglet « Récapitulatif » avec ces formules (remplacez les colonnes selon votre feuille : ici C = présence, D = accompagnants, sur l'onglet « Réponses au formulaire 1 ») :
   - Présents : `=COUNTIF('Réponses au formulaire 1'!C:C;"Oui*")`
   - Absents : `=COUNTIF('Réponses au formulaire 1'!C:C;"Non*")`
   - Accompagnants : `=SUMIF('Réponses au formulaire 1'!C:C;"Oui*";'Réponses au formulaire 1'!D:D)`
   - **Total de personnes attendues** : Présents + Accompagnants
5. Si votre Sheets est en anglais, remplacez les `;` par des `,`.

## 4. Publier sur GitHub puis Vercel (gratuit)
1. Créez un compte sur https://github.com puis **New repository** (nom : `invitation-30-ans`, public).
2. **uploading an existing file** : glissez tout le contenu du dossier (fichiers + dossiers `images` et `musique`), puis **Commit changes**.
3. Créez un compte sur https://vercel.com (connexion avec GitHub).
4. **Add New… > Project**, choisissez le dépôt `invitation-30-ans`, puis **Deploy** (aucun réglage à changer).
5. Vercel vous donne un lien du type `https://invitation-30-ans.vercel.app`.

## 5. Aperçu WhatsApp
Dans `index.html`, remplacez les deux occurrences de `https://VOTRE-SITE.vercel.app` par votre vrai lien, puis remettez le fichier sur GitHub : Vercel se met à jour tout seul. Ensuite, collez le lien dans WhatsApp : titre et photo s'affichent. (Si l'ancien aperçu reste, WhatsApp le garde en cache quelques heures.)

## 6. Tester avant d'envoyer
- Sans `formUrl`, le bouton affiche un message poli : c'est normal.
- La musique ne démarre jamais seule : il faut appuyer sur « Musique ».
- Pour tester en local : double-cliquez sur `index.html`.
