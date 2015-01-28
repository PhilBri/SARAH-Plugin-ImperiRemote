# ImperiRemote

Plugin for S.A.R.A.H. project by JP Encausse
http://blog.encausse.net/s-a-r-a-h/


## ImperiRemote Setup

Téléchargez le plugin ImperiRemote sur le MarketPlace de SARAH
http://marketplace.sarah.encausse.net/store

Démarrez SARAH et lancez l'interface Web du client http://127.0.0.1:8080/home

Dans le portlet ImperiRemote, renseignez les champs suivants :
- IP       = 'IP de ImperiHome'.
- Port     = 'Port de ImperiHome'.


## ImperiRemote XML modifications

Vous pouvez modifier le fichier XML a votre convenance pour adapter ce plugin à vos besoins.

Les paramètres modifiables sonts :
- 'dashboard'
- 'gotopage'
- 'pageIdx'
- 'valeur demandée'


## ImperiRemote Example

- "SARAH affiche la caméra".
- Execution du code http://ip_adress:port/api/rest/dashboard/gotopage?pageIdx=1