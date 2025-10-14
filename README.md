# 📱 CV Creator App

CV Creator App es una aplicación móvil desarrollada con **React Native** y **Expo Router**, que permite a los usuarios crear, visualizar y exportar su Currículum Vitae (CV) de manera rápida y profesional.  
Incluye funcionalidades para agregar información personal, experiencia laboral, educación, habilidades técnicas y una foto de perfil, generando finalmente un PDF compartible.

---

## 🚀 Características principales

- 🧍 **Información personal:** captura de datos como nombre, correo, teléfono y resumen profesional.
- 💼 **Experiencia laboral:** registro de cargos, empresas, fechas y descripciones.
- 🎓 **Educación:** detalle de estudios realizados, títulos y años de graduación.
- 🧠 **Habilidades técnicas:** selección del nivel de experiencia en cada habilidad.
- 📸 **Foto de perfil:** permite tomar o seleccionar una foto desde la galería.
- 🧾 **Vista previa y exportación a PDF:** genera una versión lista para compartir.

---

## 🏗️ Estructura del proyecto

```
jmvillanueva-dev-mobilapp-cv-app/
├── app/                  # Pantallas principales (index, photo, personal-info, experience, education, skills, preview)
├── components/           # Componentes reutilizables como campos de entrada, selectores y vista previa del CV
├── context/              # Contexto global (CVContext) para gestionar el estado de la aplicación
├── constants/            # Temas y configuraciones generales
├── validation/           # Esquemas Yup para validar formularios
├── hooks/                # Hooks personalizados (tema, color, esquema)
├── scripts/              # Scripts utilitarios (reinicio del proyecto)
├── types/                # Definiciones de tipos TypeScript
├── app.json              # Configuración del proyecto Expo
├── eas.json              # Configuración para builds con EAS
├── package.json          # Dependencias y scripts del proyecto
└── tsconfig.json         # Configuración TypeScript
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/jmvillanueva-dev/mobilapp-cv-app.git
cd mobilapp-cv-app
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar la app en modo desarrollo

```bash
npx expo start
```

Puedes abrir la app en:

- 📱 **Expo Go** (Android/iOS)
- 💻 **Emulador Android/iOS**
- 🌐 **Web**

---

## 🧩 Tecnologías utilizadas

- **React Native (Expo SDK 54)**
- **Expo Router** (navegación basada en archivos)
- **React Hook Form + Yup** (gestión y validación de formularios)
- **Expo Image Picker / Camera** (gestión de imágenes)
- **Expo Print & Sharing** (generación y exportación de PDF)
- **Day.js** (manejo de fechas)
- **TypeScript** (tipado estático)

---

## 🧠 Arquitectura

El proyecto sigue una arquitectura basada en componentes funcionales y contexto global:
- **`CVContext`** gestiona todos los datos del CV (información personal, educación, experiencia, habilidades).
- Cada pantalla de `app/` interactúa con el contexto para agregar, modificar o eliminar secciones del CV.
- **Validaciones** de los formularios gestionadas con `Yup`.
- **Generación de PDF** con `expo-print` y **compartición** con `expo-sharing`.

---

## 📦 Scripts disponibles

| Script | Descripción |
|--------|--------------|
| `npm start` | Inicia el servidor de desarrollo de Expo. |
| `npm run android` | Abre la app en el emulador de Android. |
| `npm run ios` | Abre la app en el simulador de iOS. |
| `npm run web` | Ejecuta la app en el navegador. |
| `npm run reset-project` | Restaura el proyecto a un estado inicial limpio. |

---

## 📲 Generar APK (build preview)

Para crear una versión **APK interna** de prueba:

```bash
eas build -p android --profile preview
```

El perfil `preview` definido en `eas.json` genera un **archivo `.apk`** para instalación directa.

---

## 👨‍💻 Autor

**Jhonny Villanueva Montoya**  
📍 [GitHub](https://github.com/jmvillanueva-dev)  
💼 Desarrollador Full Stack | Especialista en Aplicaciones Móviles e IA  

---

## 🪪 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente mencionando la autoría correspondiente.

---

© 2025 Jhonny Villanueva Montoya.
