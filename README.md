# 🎮 Sistema de Control de Modelos 3D

## 📋 Descripción

Este proyecto es un sistema básico de control de modelos 3D desarrollado con Three.js. Permite cargar y visualizar modelos FBX con animaciones, incluyendo controles de cámara y una interfaz GUI para seleccionar entre diferentes modelos disponibles.

## 🚀 Características Principales

### 🎮 **Carga de Modelos 3D**
- **Carga de modelos FBX** con animaciones
- **Visualización 3D** con renderizado WebGL
- **Controles de cámara** con OrbitControls
- **Interfaz GUI** para selección de modelos

### 🎨 **Características Visuales**
- **Iluminación realista** con luces direccionales y hemisféricas
- **Sombras dinámicas** para mayor realismo
- **Suelo y rejilla** de referencia
- **Efectos de niebla** atmosféricos

### 🎭 **Modelos Disponibles**
- **Samba Dancing**: Modelo con animación de baile
- **Monkey**: Modelo básico de primate
- **Monkey Embedded Texture**: Versión con texturas
- **Morph Test**: Modelo para pruebas de morphs
- **vCube**: Modelo cúbico de prueba

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
│   └── main.css           # Estilos CSS básicos
├── js/
│   └── main.js            # Código principal
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
- Usa el dropdown en la interfaz GUI para seleccionar un modelo
- Los modelos se cargan automáticamente con sus animaciones

### **2. Controles de Cámara**
- **Mouse izquierdo + arrastrar**: Rotar cámara
- **Mouse derecho + arrastrar**: Pan de cámara
- **Rueda del mouse**: Zoom in/out

### **3. Controles de Morphs**
- Si el modelo tiene morphs disponibles, aparecerá una carpeta "Morphs" en la GUI
- Usa los sliders para ajustar los morphs del modelo

## 🔧 Características Técnicas

### **Sistema de Renderizado**
- **WebGL** para renderizado 3D acelerado por GPU
- **Sombras dinámicas** con mapas de sombra
- **Antialiasing** para bordes suaves
- **Fog** atmosférico para profundidad

### **Gestión de Recursos**
- **Limpieza automática** de modelos anteriores
- **Gestión eficiente de memoria** para modelos FBX
- **Dispose** de geometrías y materiales

### **Interfaz de Usuario**
- **GUI responsive** que se adapta a diferentes tamaños de pantalla
- **Controles organizados** en carpetas
- **Estadísticas de rendimiento** en tiempo real

## 📊 Modelos Incluidos

| Modelo | Descripción | Características |
|--------|-------------|-----------------|
| **Samba Dancing** | Modelo de baile | Animación de samba brasileña |
| **Monkey** | Modelo básico | Geometría simple |
| **Monkey Embedded Texture** | Versión texturizada | Incluye materiales |
| **Morph Test** | Modelo de prueba | Para testing de morphs |
| **vCube** | Cubo simple | Geometría básica |

## 🎯 Funcionalidades

### **Carga de Modelos**
- Carga automática de modelos FBX
- Reproducción automática de animaciones
- Limpieza de recursos al cambiar modelos

### **Controles Visuales**
- Cámara orbital con controles intuitivos
- Zoom y pan suaves
- Rotación libre alrededor del modelo

### **Interfaz GUI**
- Selección de modelos con dropdown
- Controles de morphs (si están disponibles)
- Estadísticas de rendimiento

## 🐛 Solución de Problemas

### **Si el modelo no se carga:**
1. Verifica que el archivo FBX existe en la carpeta `models/fbx/`
2. Asegúrate de que el servidor web esté funcionando
3. Revisa la consola del navegador para errores

### **Si hay problemas de rendimiento:**
- Verifica que tu navegador tenga soporte WebGL
- Cierra otras pestañas que consuman recursos
- Reduce la calidad gráfica si es necesario

## 📝 Código

El código está organizado de manera clara y modular:

- **init()**: Inicialización de la escena, cámara, luces y controles
- **loadAsset()**: Carga y configuración de modelos FBX
- **animate()**: Bucle principal de animación
- **onWindowResize()**: Manejo de redimensionamiento de ventana

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

- [ ] Más formatos de modelos 3D
- [ ] Controles de animación más avanzados
- [ ] Sistema de iluminación configurable
- [ ] Exportación de capturas de pantalla
- [ ] Modo de presentación automática

---

¡Disfruta explorando los diferentes modelos 3D disponibles! 🎮🎨