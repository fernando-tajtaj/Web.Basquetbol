# Manual de Usuario – Web Basquetbol

Este manual te guía para iniciar sesión y usar las principales funciones de la aplicación Web Basquetbol: marcador de partidos, reportes y administración.

## Introducción a la app

- Gestiona equipos y jugadores, crea y actualiza partidos.
- Lleva el control del marcador en tiempo real: puntos, faltas y cuartos.
- Consulta y descarga reportes en PDF.
- Algunas secciones (p. ej., Reportes y Administración) requieren rol de administrador.

## Requisitos del sistema

- Navegador moderno actualizado: Chrome, Edge, Firefox o Safari.
- Conexión a Internet estable.
- Resolución recomendada: ≥ 1280×720. En móviles funciona, pero la edición de partidos es más cómoda en pantallas grandes.
- Si tu despliegue incluye inicio con Google (habilitado por defecto), necesitas una cuenta de Google. Si tu organización habilita Facebook, necesitarás tu cuenta de Facebook.

## Cómo iniciar sesión (Google/Facebook)

1. Abre la página de inicio de sesión: `/login`.
2. Opciones disponibles:
   - Usuario y contraseña: completa ambos campos y pulsa “Ingresar”.
   - Iniciar sesión con Google: pulsa el botón “Iniciar sesión con Google” y autoriza el acceso. Serás redirigido de vuelta a la app.
   - Facebook: si tu despliegue lo habilita, verás el botón “Iniciar sesión con Facebook” y el flujo es similar al de Google.
3. Si el acceso es exitoso, ingresarás al inicio (`/home`).

Consejos si algo falla:

- Si no ves el botón de Facebook, es porque no está habilitado en este despliegue.
- Si el navegador bloquea ventanas, habilita las ventanas emergentes para el dominio de la app.
- Ante errores repetidos, cierra sesión y vuelve a intentar o contacta al administrador.

## Cómo usar cada módulo

### Marcador (Partidos)

El marcador se edita en el formulario de “Actualizar Partido”.

1. Ve a “Partidos” → selecciona un partido de la lista y pulsa “Editar” (o crea uno nuevo con “Crear” y luego edítalo).
2. En modo edición verás la tarjeta “Marcador del Partido”. Ahí puedes:
   - Ajustar puntos del equipo local o visitante con +1, +2, +3 y -1.
   - Registrar faltas por equipo con + y -.
   - Avanzar o retroceder el “Cuarto” (0 a 4). El estado del partido se actualiza automáticamente (Pendiente, En juego, Finalizado).
3. Pulsa “Guardar” para aplicar los cambios.

Notas:

- Para crear un partido debes seleccionar fecha/hora, equipos y estado inicial. Los jugadores disponibles se cargan por equipo y puedes marcar titulares.

### Reportes

1. Ve a “Reportes” (`/report`). Requiere rol “admin”.
2. Elige un reporte de la lista y pulsa “Consultar”.
3. Si hay resultados, verás una tabla con los datos. Puedes:
   - Filtrar (si el reporte lo soporta).
   - Descargar en PDF con “Exportar PDF”.

### Administración

- Requiere rol “admin”. Aquí se concentran funciones avanzadas y de configuración que tu organización habilite. Si no ves contenido todavía, puede estar en preparación en tu despliegue.

## Preguntas frecuentes (FAQ)

- No puedo iniciar sesión.

  - Verifica usuario/contraseña o usa “Iniciar sesión con Google”.
  - Asegúrate de permitir ventanas emergentes para OAuth.

- No veo “Reportes” o “Administración”.

  - Tu cuenta no tiene rol “admin” o no has iniciado sesión. Contacta a un administrador.

- El reporte sale vacío o sin datos.

  - Revisa el rango de fechas/filtros y vuelve a consultar. Si persiste, confirma con el administrador que existan datos para ese reporte.

- El PDF se descarga en blanco.

  - Asegúrate de haber consultado primero y que la tabla tenga datos antes de exportar.

- Me desconecta o veo error 401.

  - La sesión pudo expirar. Inicia sesión nuevamente.

- ¿Qué navegadores son compatibles?
  - Chrome, Edge, Firefox y Safari recientes. Mantén tu navegador actualizado.
