# Aplicacion web de Inventario

|                      Titulo                     |                                                             Contenido                                                                                  |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Aplicación Web de Inventario Contenerizada**  | Descripción concisa del propósito del proyecto (Ej: Un sistema modular para la gestión de inventario, implementado con arquitectura de microservicios).|
| **Tecnologías Clave**                           | Listado de las herramientas principales: Node.js, Nginx, Docker, Docker Compose.                                                                       |


# Arquitectura del proyecto

|   Servicio   |          Rol        | Puerto interno | Puerto host  |                         Descripción                          |
|--------------|---------------------|----------------|--------------|--------------------------------------------------------------|
| **backend**  | API Node.js/Express |     3000       |      —       | Gestiona los datos y operaciones CRUD sobre el inventario    |
| **frontend** | Servidor Nginx      |      80        |     8080     | Muestra la interfaz web y comunica las peticiones al backend |

# Estructura del proyecto
Aplicación web-inventario/
├── backend/: ├── Dockerfile ├── package.json ├── server.js├── data.json
├── frontend/: ├── Dockerfile ├── nginx.conf ├── index.html ├── styles.css ├── app.js
└── docker-compose.yml

#Configuración (Prerrequisitos)
## ⚙️ Configuración y Prerrequisitos
Para ejecutar este proyecto, necesitas tener instalados los siguientes programas en tu sistema:
* **[Git](https://git-scm.com/):** Para clonar el repositorio.
* **[Docker](https://www.docker.com/get-started):** Versión 20.10 o superior.
* **[Docker Compose](https://docs.docker.com/compose/install/):** Versión 1.29 o superior.
* **[WSL 2 habilitado] (si estás en Windows 10/11)
* **[Conexión a internet] (solo la primera vez que descargue las imágenes)

Sigue estos pasos para poner en marcha la aplicación:
1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/AndreyFCB1001/AplicacionwebInventarioDoker.git](https://github.com/AndreyFCB1001/AplicacionwebInventarioDoker.git)
    cd AplicacionwebInventarioDoker
    ```

2.  **Construir y Ejecutar Contenedores:**
    Utiliza Docker Compose para construir las imágenes (`backend` y `frontend`) y levantar los servicios.

    ```bash
    docker-compose up --build -d
    # --build: asegura que las imágenes Docker se reconstruyan con el código más reciente.
    # -d: ejecuta los contenedores en modo 'detached' (segundo plano).
    ```

3.  **Acceder a la Aplicación:**
    Una vez que los contenedores estén activos (puede tomar unos segundos):
    * **Frontend (UI):** Abre tu navegador y navega a `http://localhost:[PUERTO_FRONTEND]`.
    * **Backend (API):** La API estará accesible internamente en `http://backend:[PUERTO_BACKEND]`.
    > **NOTA:** Reemplaza `[PUERTO_FRONTEND]` y `[PUERTO_BACKEND]` con los puertos definidos en tu `docker-compose.yml`.
    > En nuestro caso accedemos a "http://localhost:8080" para visualizar la api.

4. Estructura de Servicios (Detalle Técnico)
	## 🗺️ Estructura del Proyecto
El proyecto está dividido en dos servicios principales gestionados por Docker Compose:
* **`backend/` (Servicio API):**
    * **Tecnología:** Node.js (Express).
    * **Propósito:** Lógica de negocio, gestión de la persistencia de datos y exposición de la API REST.
* **`frontend/` (Servicio UI):**
    * **Tecnología:** HTML, CSS, JavaScript (servido por Nginx).
    * **Propósito:** Interfaz de usuario, consume los endpoints del servicio `backend`.
5. Explicacion de la utilización de GitHub Actions
## 🚀 Integración Continua con GitHub Actions
El proyecto incluye un workflow automatizado de CI/CD que se ejecuta en GitHub Actions. Este workflow realiza las siguientes tareas:
- Instala dependencias de `backend` y `frontend` (si existen).
- Ejecuta pruebas y build (si están configurados en `package.json`).
- Levanta la aplicación usando `docker compose up -d --build`.

### Activación Automática del Workflow
El workflow se dispara automáticamente en:
- **Push a `main`:** Cuando haces `git push` a la rama principal.
- **Pull Request a `main`:** Cuando abres un PR hacia `main`.
- **Disparo manual:** Accediendo a la pestaña **Actions** en GitHub y clickeando **Run workflow** en el job **Docker Compose CI**.

### Ver el Estado del Workflow en GitHub
1. Dirígete a tu repositorio en GitHub.
2. Haz clic en la pestaña **Actions** (arriba del repositorio).
3. Selecciona **Docker Compose CI** de la lista de workflows.
4. Verás un historial de ejecuciones con badges de ✅ (exitoso) o ❌ (fallido).
5. Haz clic en una ejecución para ver detalles, logs y resultados.

### Probar el Workflow Localmente (PowerShell en Windows)
Para simular exactamente lo que GitHub Actions ejecuta, puedes correr los comandos localmente en PowerShell:

```powershell
# 1. Asegúrate de estar en la raíz del repositorio
cd "C:\Users\jrp-2\Desktop\ARCHIVOS DE TRABAJO DE MIGUEL\7 semestre\Segundo bloque\INTEGRACIÓN CONTINUA\Entrega Final\Aplicacion-Web-InventarioDoker-main"

# 2. Instala Node 18 (si no lo tienes)
# Descárgalo de https://nodejs.org/ o usa un gestor como nvm-windows

# 3. Navega al backend, instala dependencias y ejecuta tests/build
cd "aplicacion web- inventario\backend"
npm ci
npm test
npm run build
cd ..\..

# 4. Navega al frontend (si existe package.json), instala dependencias y ejecuta tests/build
cd "aplicacion web- inventario\frontend"
if (Test-Path "package.json") {
    npm ci
    npm test
    npm run build
}
cd ..\..

# 5. Levanta los contenedores con docker compose
$COMPOSE_FILE = "aplicacion web- inventario\docker-compose.yml"
docker compose -f $COMPOSE_FILE down
docker compose -f $COMPOSE_FILE pull
docker compose -f $COMPOSE_FILE up -d --build

# 6. Verifica que los contenedores estén corriendo
docker compose -f $COMPOSE_FILE ps

# 7. Para ver los logs
docker compose -f $COMPOSE_FILE logs -f

# 8. Cuando termines, detén los contenedores
docker compose -f $COMPOSE_FILE down
```

### Notas Importantes
- Los comandos `npm test` y `npm run build` son opcionales; si no existen en `package.json`, se saltan sin error.
- Si algún test o build falla en CI, el workflow sigue adelante (no-bloqueante), permitiendo inspeccionar los logs en GitHub Actions.
- Para hacer tests/build obligatorios (romper el workflow si fallan), contáctate con el equipo de DevOps.

## 📊 Análisis de Cobertura de Código con Codecov

El proyecto incluye integración automática con **Codecov** para monitorear la cobertura de código en cada push y pull request.

### ¿Qué es Codecov?
Codecov es una herramienta que analiza la cobertura de código (qué porcentaje de tu código está cubierto por tests) y proporciona:
- Reportes visuales de cobertura por archivo y línea
- Comparación de cobertura entre commits
- Comentarios automáticos en PRs mostrando cambios de cobertura
- Umbrales configurables para garantizar calidad mínima

### Cómo Funciona
1. **Ejecución de Tests con Coverage**: Durante CI, el workflow ejecuta `npm run test:coverage` en el backend.
2. **Generación de Reporte**: Jest genera un reporte en formato `lcov.info` en la carpeta `coverage/`.
3. **Subida Automática**: La acción `codecov/codecov-action@v4` sube el reporte a Codecov.
4. **Análisis**: Codecov analiza el reporte y actualiza el estado en GitHub.

### Ver Reportes de Cobertura
1. **En GitHub (comentarios automáticos en PRs)**:
   - Cada PR recibirá un comentario automático de Codecov mostrando:
     - % total de cobertura
     - Cambio de cobertura vs. rama base
     - Archivos nuevos o modificados

2. **En Codecov Dashboard**:
   - Ve a https://codecov.io/gh/ayakamaster999/Aplicacion-web-inventario-EntregaFinal-
   - Necesitas conectar tu cuenta GitHub a Codecov (es gratuito para repos públicos)
   - Visualiza histórico de cobertura, reportes detallados y estadísticas

### Configuración de Umbrales
El archivo `codecov.yml` (en la raíz del repo) define:
- **Target Coverage (proyecto)**: 70% mínimo
- **Target Coverage (patch)**: 80% para nuevos cambios
- **Flags**: Seguimiento separado por `backend` y `frontend`

### Ejecutar Tests Localmente
Para simular la generación de reportes localmente:

```powershell
cd "aplicacion web- inventario\backend"
npm install
npm run test:coverage
```

Esto generará:
- `coverage/lcov.info` - Reporte en formato lcov (subido a Codecov)
- `coverage/lcov-report/index.html` - Reporte HTML visual (puedes abrirlo en el navegador)

### Notas Importantes
- **Token Codecov**: Para repos públicos no es necesario; para privados, añade `CODECOV_TOKEN` en Settings → Secrets
- **Exclusiones**: El archivo `codecov.yml` excluye `node_modules`, archivos de config y archivos de test
- **Status Checks**: Si la cobertura cae por debajo del umbral, Codecov marcará el check como ⚠️ (advertencia no-bloqueante)

 
6. Contribuciones y Contacto
## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un 'issue' o envía un 'pull request' para sugerir mejoras o reportar errores.
## ✉️ Contacto
* **Autores:** [Julian David Romero Hernandez / Jhoan Prieto Sanchez / Jeisson Camilo Lopez Bello / Miguel Ángel Roa Pinzón / Andrey Suarez Suarez]
* **Email:** [Janprietos@poligran.edu.co / mangroa@poligran.edu.co / jdavidromero@poligran.edu.co / jcamilolopez3@poligran.edu.co /  astsuarez@poligran.edu.co]
* **Subgrupo:**[6].







