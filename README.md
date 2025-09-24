# 🎭 Sistema de Control de Modelos 3D con Bailes de Samba

## 📋 Descripción

Este proyecto es un sistema avanzado de control de modelos 3D desarrollado con Three.js que incluye un sistema único de bailes de samba con pasos auténticos y realistas. El sistema permite cargar modelos FBX y aplicar diferentes estilos de baile brasileño con movimientos únicos para cada estilo.

## 🚀 Características Principales

### 🎭 **Sistema de Bailes de Samba Únicos**
- **5 estilos diferentes** de samba con pasos completamente únicos
- **Movimientos realistas** basados en técnicas auténticas de samba brasileña
- **Animaciones continuas** que nunca se detienen
- **Transiciones suaves** entre diferentes estilos

### 🎮 **Controles Avanzados**
- **Interfaz GUI intuitiva** con controles organizados en carpetas
- **Control de tempo** en tiempo real (0.5x - 2.0x)
- **Ajustes de realismo** (movimiento de cadera, intensidad de pasos)
- **Variaciones naturales** para mayor autenticidad

### 🎨 **Visualización en Tiempo Real**
- **Panel informativo** que muestra el estilo actual y descripción
- **Indicador de estado** visual (▶️ Reproduciendo / ⏸️ Detenido)
- **Logs detallados** en consola para diagnóstico
- **Estadísticas de rendimiento** integradas

## 🎯 Estilos de Samba Disponibles

| Estilo | Descripción | Tempo | Características |
|--------|-------------|-------|-----------------|
| **Samba Básico** | Pasos fundamentales | 1.0x | Movimientos constantes y predecibles |
| **Samba Reggae** | Influencia reggae | 0.8x | Más lento y sensual, balanceo amplio |
| **Samba Enredo** | Carnaval elaborado | 1.2x | Rápido y energético, pasos intensos |
| **Samba Rock** | Fusión con rock | 1.1x | Dinámico y poderoso, movimientos marcados |
| **Samba Pagode** | Suave y sensual | 0.9x | Elegante y romántico, movimientos fluidos |

## 🛠️ Tecnologías Utilizadas

- **Three.js**: Motor de renderizado 3D
- **FBX Loader**: Carga de modelos 3D
- **lil-gui**: Interfaz de usuario
- **OrbitControls**: Controles de cámara
- **Stats.js**: Estadísticas de rendimiento

## 📁 Estructura del Proyecto

```
threejs-3d-models/
├── index.html              # Página principal
├── css/
│   └── main.css           # Estilos CSS
├── js/
│   └── main.js            # Código principal (completamente comentado)
├── jsm/                   # Módulos de Three.js
│   ├── controls/
│   ├── loaders/
│   └── libs/
├── models/
│   └── fbx/              # Modelos 3D FBX
└── build/                # Build de Three.js
```

## 🚀 Instalación y Uso

### **Requisitos**
- Navegador web moderno con soporte WebGL
- Servidor web local (Python, Node.js, etc.)

### **Pasos de Instalación**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Jeztorres/Control-de-modelos-3D.git
   cd Control-de-modelos-3D
   ```

2. **Iniciar servidor local:**
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx http-server -p 8000
   ```

3. **Abrir en navegador:**
   ```
   http://localhost:8000
   ```

## 🎮 Cómo Usar

### **1. Cargar Modelo**
- Selecciona "Samba Dancing" en el panel "Modelos 3D"
- El panel de bailes aparecerá automáticamente

### **2. Cambiar Estilos de Baile**
- Usa el dropdown "Estilo de Baile" en el panel "Bailes de Samba"
- Cada cambio aplica pasos únicos y específicos del estilo

### **3. Personalizar Experiencia**
- **Tempo**: Ajusta la velocidad del baile (0.5x - 2.0x)
- **Movimiento de Cadera**: Controla la intensidad (0.0 - 2.0)
- **Intensidad de Pasos**: Ajusta los movimientos de pies (0.0 - 2.0)
- **Variación Natural**: Activa variaciones aleatorias

### **4. Controles de Emergencia**
- **▶️ Reproducir Baile**: Reinicia la animación manualmente
- **🔄 Reset Completo**: Limpia todo el sistema y recarga el modelo

## 🔧 Características Técnicas

### **Sistema de Animación Avanzado**
- **Manipulación directa de huesos** para movimientos naturales
- **Configuración específica por estilo** con amplitudes y frecuencias únicas
- **Sistema de fases desfasadas** para evitar movimientos robóticos
- **Verificación automática** que mantiene las animaciones corriendo

### **Gestión de Recursos**
- **Limpieza automática** de modelos anteriores
- **Gestión eficiente de memoria** para modelos FBX
- **Sistema de fallback** para casos de error
- **Logs detallados** para diagnóstico

### **Optimización de Rendimiento**
- **Verificaciones probabilísticas** (no cada frame)
- **Actualización selectiva** de elementos visuales
- **Gestión inteligente** de recursos de GPU

## 📊 Sistema de Diagnóstico

### **Logs de Consola**
Abre la consola del navegador (F12) para ver:
- `🎬 Cargado modelo: [nombre]`
- `🎭 Aplicando [estilo]: [descripción]`
- `✅ Animación reproduciéndose correctamente`
- `⚠️ Animación detenida, reiniciando automáticamente...`

### **Panel Visual**
- **Estado en tiempo real**: ▶️ Reproduciendo / ⏸️ Detenido
- **Información del baile**: Nombre, descripción, tempo
- **Colores dinámicos**: Verde (activo) / Rojo (detenido)

## 🎭 Características Únicas del Sistema de Samba

### **Movimientos Auténticos**
Cada estilo implementa movimientos específicos basados en técnicas reales:

- **Samba Reggae**: Movimientos ondulantes y sensuales
- **Samba Enredo**: Pasos rápidos y energéticos de carnaval
- **Samba Rock**: Movimientos agresivos y dinámicos
- **Samba Pagode**: Pasos suaves y románticos

### **Sistema de Pasos Realistas**
- **Manipulación de esqueleto** en tiempo real
- **Movimientos de cadera** característicos de cada estilo
- **Pasos alternados** con fases específicas
- **Balanceo del cuerpo** coordinado con el ritmo

## 🐛 Solución de Problemas

### **Si el baile se detiene:**
1. Usa el botón "▶️ Reproducir Baile"
2. Cambia a otro estilo y vuelve al deseado
3. Usa "🔄 Reset Completo" si persiste el problema

### **Si no aparece el panel de bailes:**
1. Asegúrate de seleccionar "Samba Dancing" en Modelos 3D
2. Recarga la página si es necesario

### **Para mejor rendimiento:**
- Desactiva "Variación Natural" si hay lag
- Reduce la "Intensidad de Pasos" si es necesario
- Verifica que el navegador tenga soporte WebGL

## 📝 Código Completamente Comentado

Todo el código está extensamente comentado con:
- **Secciones claramente definidas**
- **Explicaciones detalladas** de cada función
- **Comentarios inline** para líneas complejas
- **Documentación de parámetros** y configuraciones

## 🤝 Contribuciones

Este proyecto está abierto a contribuciones. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Jezra Torres**
- GitHub: [@Jeztorres](https://github.com/Jeztorres)
- Repositorio: [Control-de-modelos-3D](https://github.com/Jeztorres/Control-de-modelos-3D.git)

## 🎯 Próximas Características

- [ ] Más estilos de samba brasileña
- [ ] Sistema de música sincronizada
- [ ] Efectos de partículas para bailes
- [ ] Exportación de animaciones
- [ ] Modo de grabación de movimientos

---

¡Disfruta explorando los diferentes estilos de samba y creando tu propia experiencia de baile única! 🎭💃🎵
