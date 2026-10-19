# JAMES CALCULATOR PRO - GID POU ENSTALASYON APK AK ZIP

Bonswa / Bonjou ! Men tout enfòmasyon ak etap fasil pou w ka itilize James Calculator Pro sou telefòn ou oswa sou òdinatè w.

---

## 1. KÒMAN POU JWENN AK TELECHAJE FICHIER ZIP LA
Fichye ZIP la gen tout kòd pwojè a, tout konpozan yo, estil Tailwind yo, ak vèsyon konpile a ki pare pou fonksyone.

- **Non Fichye a :** `james-calculator-pro.zip`
- **Lyen dirèk pou telechaje :** Klike sou bouton **"Telechaje ZIP la"** ki nan tèt aplikasyon an (Header) oswa nan Paramèt (Settings).
- Ou ka telechaje l dirèkteman tou nan navigatè w sou : `/james-calculator-pro.zip`

---

## 2. KÒMAN POU ENSTALE LI SOU TELEFÒN ANDROID OU KÒM YON APK (Metòd PWA 100% Otomatik & San Pwoblèm)
Aplikasyon an deja fèt kòm yon **Progressive Web App (PWA)** ofisyèl avèk Service Worker ak Web Manifest. Sa vle di li ka enstale sou telefòn Android ou egzakteman tankou yon fichye APK :

1. Ouvri aplikasyon James Calculator Pro nan **Google Chrome** sou telefòn Android ou.
2. Klike sou **3 ti pwen yo** anlè a dwat nan Chrome.
3. Klike sou **"Ajoute sou Ekran Akèy"** (Add to Home screen) oswa **"Enstale Aplikasyon an"** (Install App).
4. Klike **"Enstale"**.
5. **REZILTA :** Yon bèl ikòn James Calculator Pro ap parèt sou ekran prensipal telefòn ou. Lè w ouvri l, li ouvri an plen ekran (san ba navigatè a), li fonksyone rapid anpil, epi li **mache 100% SAN ENTÈNÈT (OFFLINE)** !

---

## 3. KÒMAN POU JENERE YON FICHIER .APK OFISYÈL POU ANDROID (Metòd 1 Minit)
Si w bezwen yon vrè fichye ki fini pa `.apk` pou voye bay zanmi w sou WhatsApp oswa mete sou Google Play Store :

### Opsyon A : Avèk sit gratis PWABuilder (San kòd, 1 minit)
1. Ale sou sit : [https://www.pwabuilder.com](https://www.pwabuilder.com)
2. Mete lyen sit James Calculator Pro a.
3. Klike sou **"Start"** epi **"Next"**.
4. Chwazi **"Android"** epi klike sou **"Generate Package"** oswa **"Download APK"**.
5. W ap jwenn yon fichye `.apk` pare pou enstale sou nenpòt telefòn Android !

### Opsyon B : Avèk Capacitor (Nan tèminal òdinatè w)
1. Dekonprese fichye `james-calculator-pro.zip` la sou òdinatè w.
2. Ouvri tèminal nan dosye a epi fè :
   ```bash
   npm install
   npm run build
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "James Calculator Pro" "com.james.calculator" --web-dir=dist
   npx cap add android
   npx cap open android
   ```
3. Android Studio ap ouvri, klike sou meni **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

---

## 4. KÒMAN POU LANSE FICHIER ZIP LA SOU ÒDINATÈ W
1. Dekonprese fichye `james-calculator-pro.zip` la.
2. Asire w ou gen Node.js enstale sou òdinatè w.
3. Ouvri yon tèminal nan dosye a epi ekri :
   ```bash
   npm install
   npm run dev
   ```
4. Ouvri lyen `http://localhost:5173` oswa `http://localhost:3000` nan navigatè w.

---
**James Calculator Pro** - Kreye pa James. Tout fonksyon syantifik, finansye, konvèsyon, ak grafik disponib !
