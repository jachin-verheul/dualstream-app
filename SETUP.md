# DualStream HTTPS Server Setup

Deze gids helpt je de HTTPS server voor DualStream op te zetten.

## Vereisten

- Node.js (v14 of hoger)
- npm (meegeleverd met Node.js)
- OpenSSL (voor het genereren van SSL certificaten)

## Installatie

### 1. Dependencies installeren

```bash
npm install
```

### 2. SSL Certificaten genereren

Voor een **zelf-ondertekend certificaat** (voor lokale development):

```bash
mkdir -p ssl
openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

Volg de prompts en vul in wanneer gevraagd. Voor development kun je alle velden leeg laten en Enter drukken.

### 3. Server starten

```bash
npm start
```

De server zal draaien op: `https://localhost:3000`

## Browser waarschuwing

Bij het eerst bezoeken krijg je mogelijk een waarschuwing over het zelf-ondertekende certificaat. Dit is normaal voor development. Je kunt:
- Op "Advanced" klikken en doorgaan
- Het certificaat accepteren

## Development mode

Voor auto-reloading bij bestandswijzigingen:

```bash
npm run dev
```

## Projectstructuur

```
dualstream-app/
├── server.js           # HTTPS server configuratie
├── package.json        # Node.js dependencies
├── public/
│   └── index.html      # Web interface
└── ssl/
    ├── cert.pem        # SSL certificaat (gegenereerd)
    └── key.pem         # SSL privésleutel (gegenereerd)
```

## API Endpoints

- `GET /` - Welkomstpagina
- `GET /api/status` - Server status in JSON

## Omgevingsvariabelen

- `PORT` - Server poort (default: 3000)

Bijvoorbeeld:
```bash
PORT=8443 npm start
```

## Troubleshooting

**Certificaten niet gevonden?**
```bash
mkdir -p ssl && openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

**Poort al in gebruik?**
```bash
PORT=3001 npm start
```

**EADDRINUSE fout?**
Zet de server op een ander poort met de PORT variabele.

## Productie

Voor productie:
1. Gebruik een certificaat van een erkende Certificate Authority (CA)
2. Installeer het certificaat in de `ssl/` folder
3. Zet nodige environment variabelen in
4. Deploy met een process manager zoals PM2

Voorbeeld met PM2:
```bash
npm install -g pm2
pm2 start server.js --name "dualstream"
pm2 save
```
