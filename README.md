# Cronos App

Aplicación móvil (React Native, solo Android) para gestión de horarios/alarmas del hogar.

## Requisitos

- Node >= 22.11.0
- JDK 21 (se recomienda el JBR de Android Studio)
- Android SDK + un emulador o dispositivo Android (minSdk 27)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm start        # inicia Metro
npm run android  # compila e instala en el emulador/dispositivo
```

Si `npm run android` no encuentra `gradlew`, ejecuta el build directamente:

```bash
android\gradlew.bat installDebug
```

## Otros comandos

```bash
npm run lint  # ESLint
npm test      # Jest
```
