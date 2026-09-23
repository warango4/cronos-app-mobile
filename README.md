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

## Problemas en Windows (antivirus y rutas largas)

- **Windows Defender / antivirus:** durante la primera compilación nativa (C++/CMake/Gradle) el antivirus puede bloquear archivos temporales (por ejemplo `generate_cxx_metadata_*_timing.txt`) y el build falla o se queda colgado. Solución: agregar la carpeta del proyecto (y `%USERPROFILE%\.gradle`) a las exclusiones en *Seguridad de Windows > Protección contra virus y amenazas > Administrar la configuración > Exclusiones*, y volver a compilar.

- **Rutas largas:** Windows limita las rutas a 260 caracteres y ninja/CMake fallan por encima de eso. Clonar el proyecto en una ruta corta, por ejemplo `C:\dev\cronos-app-mobile`.

## Otros comandos

```bash
npm run lint  # ESLint
npm test      # Jest
```
