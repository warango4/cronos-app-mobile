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

## Configurar el Android SDK

Gradle necesita saber dónde está el Android SDK (se instala con Android Studio; la ruta aparece en *Settings > Languages & Frameworks > Android SDK*). Sin esto el build falla con `SDK location not found`, aunque `JAVA_HOME` esté bien configurado. Definir `ANDROID_HOME` y agregar `platform-tools` al `PATH` (ahí está `adb`, que también usa la CLI de React Native).

**Windows (PowerShell), una sola vez:**

```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";$env:LOCALAPPDATA\Android\Sdk\platform-tools", "User")
```

**macOS (zsh):**

```bash
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

Alternativa sin variables de entorno: crear `android/local.properties` (ya está en `.gitignore`) con la ruta del SDK:

```properties
# Windows
sdk.dir=C:/Users/<usuario>/AppData/Local/Android/Sdk
# macOS
sdk.dir=/Users/<usuario>/Library/Android/sdk
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
