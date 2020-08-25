# Get notification when at least one search result from doctolib is available 
## Want a doctor now but none is available in your region ? 

Launch the script and wait for someone to cancel his appointement, instantly get notification that there is an appointement available in the region

Work with https://pushover.net for notification sending, you must get an API key 

Fill those variables in index.js : 

```javascript
const DOCTOLIB_PAGE = 'https://www.doctolib.fr/dentiste/ille-et-vilaine?availabilities=3'
const PUSHOVER_TOKEN = {your token}
const PUSHOVER_USER = {your secret}
```

then launch index.js and wait for profit 