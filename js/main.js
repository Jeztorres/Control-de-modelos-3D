// ========================================
// IMPORTS Y DEPENDENCIAS
// ========================================
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// ========================================
// VARIABLES GLOBALES
// ========================================
const manager = new THREE.LoadingManager(); // Gestor de carga de archivos

// Variables principales de Three.js
let camera, scene, renderer, stats, object, loader, guiMorphsFolder;
let mixer; // Mezclador de animaciones
let currentAction = null; // Acción de animación actual
let animations = []; // Array de animaciones disponibles

const clock = new THREE.Clock(); // Reloj para control de tiempo

// ========================================
// CONFIGURACIÓN DE ESTILOS DE SAMBA
// ========================================
// Define los diferentes estilos de samba con sus características específicas
const danceStyles = {
  "Samba Básico": {
    description: "Pasos básicos de samba brasileña",
    tempo: 1.0,
    style: "básico"
  },
  "Samba Reggae": {
    description: "Samba con influencia del reggae",
    tempo: 0.8,
    style: "reggae"
  },
  "Samba Enredo": {
    description: "Samba de carnaval con pasos elaborados",
    tempo: 1.2,
    style: "enredo"
  },
  "Samba Rock": {
    description: "Fusión de samba con rock",
    tempo: 1.1,
    style: "rock"
  },
  "Samba Pagode": {
    description: "Samba más suave y sensual",
    tempo: 0.9,
    style: "pagode"
  }
};

// ========================================
// PARÁMETROS DE CONFIGURACIÓN
// ========================================
// Parámetros principales para controlar la aplicación
const params = {
  asset: "Samba Dancing", // Modelo 3D actualmente seleccionado
  danceStyle: "Samba Básico", // Estilo de baile actual
  tempo: 1.0, // Velocidad de la animación
  loop: true, // SIEMPRE en loop para que no se detenga
  crossfade: true, // Transiciones suaves entre bailes
  hipMovement: 1.0, // Intensidad del movimiento de cadera
  stepIntensity: 1.0, // Intensidad de los pasos
  naturalVariation: true // Variaciones naturales para mayor realismo
};

// Lista de modelos 3D disponibles
const assets = [
  "Samba Dancing",
  "morph_test",
  "monkey",
  "monkey_embedded_texture",
  "vCube",
];

// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================
init();

// ========================================
// FUNCIÓN DE INICIALIZACIÓN PRINCIPAL
// ========================================
function init() {
  // Crear contenedor principal
  const container = document.createElement("div");
  document.body.appendChild(container);

  // Configurar cámara con perspectiva
  camera = new THREE.PerspectiveCamera(
    45, // Campo de visión
    window.innerWidth / window.innerHeight, // Relación de aspecto
    1, // Plano cercano
    2000 // Plano lejano
  );
  camera.position.set(100, 200, 300); // Posición inicial de la cámara

  // Crear escena con fondo gris y niebla
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0); // Color de fondo gris
  scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000); // Efecto de niebla

  // Configurar iluminación de la escena
  // Luz hemisférica para iluminación general
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);

  // Luz direccional principal con sombras
  const dirLight = new THREE.DirectionalLight(0xffffff, 5);
  dirLight.position.set(0, 200, 100);
  dirLight.castShadow = true; // Habilitar sombras
  // Configurar cámara de sombras
  dirLight.shadow.camera.top = 180;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -120;
  dirLight.shadow.camera.right = 120;
  scene.add(dirLight);

  // Crear suelo/piso de la escena
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000), // Geometría del plano
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2; // Rotar para que esté horizontal
  mesh.receiveShadow = true; // Recibir sombras
  scene.add(mesh);

  // Crear rejilla de referencia
  const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  // Inicializar cargador de modelos FBX
  loader = new FBXLoader(manager);
  loadAsset(params.asset); // Cargar el modelo inicial

  // Configurar renderer WebGL
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate); // Establecer bucle de animación
  renderer.shadowMap.enabled = true; // Habilitar mapa de sombras
  container.appendChild(renderer.domElement);

  // Configurar controles de órbita para la cámara
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 100, 0); // Punto de enfoque
  controls.update();

  // Event listener para redimensionamiento de ventana
  window.addEventListener("resize", onWindowResize);

  // Estadísticas de rendimiento
  stats = new Stats();
  container.appendChild(stats.dom);

  // ========================================
  // CONFIGURACIÓN DE INTERFAZ DE USUARIO (GUI)
  // ========================================
  const gui = new GUI();
  
  // Panel de selección de modelos 3D
  const modelFolder = gui.addFolder("Modelos 3D");
  modelFolder.add(params, "asset", assets).onChange(function (value) {
    loadAsset(value); // Cargar nuevo modelo cuando cambie la selección
  });

  // Panel de control de bailes (solo para Samba Dancing)
  const danceFolder = gui.addFolder("Bailes de Samba");
  
  // Selector de estilo de baile
  danceFolder.add(params, "danceStyle", Object.keys(danceStyles)).onChange(function (value) {
    console.log(`🎭 Seleccionado: ${value}`);
    changeDanceStyle(value); // Cambiar estilo de baile
  });
  
  // Botón para reproducir baile manualmente
  danceFolder.add({ playDance: function() { 
    if (params.asset === "Samba Dancing" && mixer) {
      console.log("▶️ Reproduciendo baile...");
      applyDanceStyle(params.danceStyle);
    }
  }}, "playDance").name("▶️ Reproducir Baile");
  
  // Botón para reset completo del sistema
  danceFolder.add({ resetDance: function() { 
    console.log("🔄 Reseteando sistema de baile...");
    resetDanceSystem();
  }}, "resetDance").name("🔄 Reset Completo");
  
  // Control de velocidad (tempo)
  danceFolder.add(params, "tempo", 0.5, 2.0, 0.1).onChange(function (value) {
    if (currentAction) {
      currentAction.timeScale = value;
      console.log(`🎵 Tempo cambiado a: ${value}x`);
    }
  });
  
  // Control de loop (siempre activado para bailes)
  danceFolder.add(params, "loop").onChange(function (value) {
    if (currentAction) {
      currentAction.setLoop(THREE.LoopRepeat, 1); // SIEMPRE en loop para bailes
      console.log(`🔄 Loop: SIEMPRE ACTIVADO para bailes continuos`);
    }
  });
  
  // Control de transiciones suaves
  danceFolder.add(params, "crossfade").onChange(function (value) {
    console.log(`🌊 Crossfade: ${value ? 'Activado' : 'Desactivado'}`);
  });
  
  // Controles de realismo
  danceFolder.add(params, "hipMovement", 0.0, 2.0, 0.1).name("Movimiento de Cadera");
  danceFolder.add(params, "stepIntensity", 0.0, 2.0, 0.1).name("Intensidad de Pasos");
  danceFolder.add(params, "naturalVariation").name("Variación Natural");

  // Panel para morphs (oculto por defecto)
  guiMorphsFolder = gui.addFolder("Morphs").hide();
}

// ========================================
// FUNCIÓN PARA CARGAR MODELOS 3D
// ========================================
function loadAsset(asset) {
  loader.load("models/fbx/" + asset + ".fbx", function (group) {
    // Limpiar modelo anterior si existe
    if (object) {
      object.traverse(function (child) {
        // Limpiar esqueleto de mallas con skin
        if (child.isSkinnedMesh) {
          child.skeleton.dispose();
        }

        // Limpiar materiales
        if (child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material) => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }

        // Limpiar geometría
        if (child.geometry) child.geometry.dispose();
      });

      scene.remove(object); // Remover objeto anterior de la escena
    }

    object = group; // Asignar nuevo objeto

    // Configurar animaciones si existen
    if (object.animations && object.animations.length) {
      mixer = new THREE.AnimationMixer(object); // Crear mezclador de animaciones
      animations = object.animations; // Guardar array de animaciones

      console.log(`🎬 Cargado modelo: ${asset}`);
      console.log(`🎭 Animaciones disponibles: ${animations.length}`);
      animations.forEach((anim, index) => {
        console.log(`  ${index}: ${anim.name || 'Sin nombre'} (${anim.duration.toFixed(2)}s)`);
      });

      // Configuración especial para Samba Dancing
      if (asset === "Samba Dancing") {
        // Pequeño delay para asegurar que el mixer esté listo
        setTimeout(() => {
          applyDanceStyle(params.danceStyle); // Aplicar estilo de baile
          showDanceInfo(); // Mostrar panel de información
        }, 100);
      } else {
        // Para otros modelos, reproducir primera animación
      const action = mixer.clipAction(object.animations[0]);
        action.setLoop(THREE.LoopRepeat, 1);
      action.play();
        currentAction = action;
        hideDanceInfo(); // Ocultar panel de bailes
        console.log(`🎬 Reproduciendo animación: ${object.animations[0].name || 'Sin nombre'}`);
      }
    } else {
      mixer = null;
      animations = [];
      console.log("⚠️ No se encontraron animaciones en el modelo");
    }

    // Limpiar controles de morphs anteriores
    guiMorphsFolder.children.forEach((child) => child.destroy());
    guiMorphsFolder.hide();

    // Configurar propiedades de mallas del objeto
    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true; // Proyectar sombras
        child.receiveShadow = true; // Recibir sombras

        // Configurar controles de morphs si existen
        if (child.morphTargetDictionary) {
          guiMorphsFolder.show();
          const meshFolder = guiMorphsFolder.addFolder(
            child.name || child.uuid
          );
          Object.keys(child.morphTargetDictionary).forEach((key) => {
            meshFolder.add(
              child.morphTargetInfluences,
              child.morphTargetDictionary[key],
              0,
              1,
              0.01
            );
          });
        }
      }
    });

    scene.add(object); // Agregar objeto a la escena
  });
}

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

// Función para manejar redimensionamiento de ventana
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // Actualizar relación de aspecto
  camera.updateProjectionMatrix(); // Actualizar matriz de proyección

  renderer.setSize(window.innerWidth, window.innerHeight); // Redimensionar renderer
}

// ========================================
// BUCLE PRINCIPAL DE ANIMACIÓN
// ========================================
function animate() {
  const delta = clock.getDelta(); // Obtener tiempo transcurrido desde el último frame

  // Actualizar animaciones si hay mixer
  if (mixer) {
    mixer.update(delta); // Actualizar todas las animaciones
    
    // Verificar si la animación está reproduciéndose (SIEMPRE debe estar corriendo)
    if (currentAction && !currentAction.isRunning() && params.asset === "Samba Dancing") {
      // Solo reintentar si ha pasado suficiente tiempo desde el último cambio
      if (!window.lastDanceChange || (Date.now() - window.lastDanceChange) > 1000) {
        console.log("⚠️ Animación detenida, reiniciando automáticamente...");
        currentAction.setLoop(THREE.LoopRepeat, 1); // Asegurar que esté en loop
        currentAction.play();
      }
    }
    
    // Verificar que SIEMPRE tengamos una animación corriendo para Samba Dancing
    if (params.asset === "Samba Dancing" && (!currentAction || !currentAction.isRunning())) {
      if (!window.lastDanceChange || (Date.now() - window.lastDanceChange) > 2000) {
        console.log("🔄 No hay animación activa, iniciando baile automático...");
        applyDanceStyle(params.danceStyle);
      }
    }
  }

  // Aplicar técnicas de samba realistas solo para el modelo de Samba Dancing
  if (params.asset === "Samba Dancing" && object) {
    applyRealisticSambaTechniques(); // Aplicar movimientos de cadera y hombros
    simulateAuthenticSambaSteps(); // Simular pasos auténticos
    
    // Aplicar variaciones aleatorias ocasionalmente para mayor realismo
    if (params.naturalVariation && Math.random() < 0.01) { // 1% de probabilidad cada frame
      createRealisticDanceVariations();
    }
    
    // Actualizar estado visual ocasionalmente (no cada frame para mejor rendimiento)
    if (Math.random() < 0.05) { // 5% de probabilidad cada frame
      updateDanceInfo();
    }
  }

  renderer.render(scene, camera); // Renderizar la escena

  stats.update(); // Actualizar estadísticas de rendimiento
}

// ========================================
// SISTEMA DE BAILES DE SAMBA
// ========================================

// Función principal para aplicar un estilo de baile específico
function applyDanceStyle(danceStyle) {
  // Verificar que tenemos los componentes necesarios
  if (!mixer || !animations.length) {
    console.log("⚠️ No hay mixer o animaciones disponibles");
    return;
  }

  const styleConfig = danceStyles[danceStyle];
  if (!styleConfig) {
    console.log("⚠️ Configuración de estilo no encontrada");
    return;
  }

  console.log(`🔄 Iniciando cambio a: ${danceStyle}`);
  
  // Marcar el momento del cambio para evitar conflictos con verificaciones automáticas
  window.lastDanceChange = Date.now();

  // Limpiar completamente la acción anterior para evitar conflictos
  if (currentAction) {
    console.log("🛑 Deteniendo acción anterior...");
    currentAction.stop();
    currentAction.reset();
    currentAction.enabled = false;
    
    // Esperar un poco para que se complete la limpieza antes de crear nueva acción
    setTimeout(() => {
      createNewDanceAction(danceStyle, styleConfig);
    }, 50);
  } else {
    createNewDanceAction(danceStyle, styleConfig);
  }
}

// Función auxiliar para crear nueva acción de baile con configuración específica
function createNewDanceAction(danceStyle, styleConfig) {
  console.log(`🎬 Creando nueva acción para: ${danceStyle}`);
  
  // Usar siempre la primera animación (la única disponible en el modelo FBX)
  const animationIndex = 0;
  
  // Crear nueva acción de animación
  const newAction = mixer.clipAction(animations[animationIndex]);
  
  // Configurar la animación desde cero para evitar conflictos
  newAction.reset();
  newAction.enabled = true;
  newAction.setLoop(THREE.LoopRepeat, 1); // SIEMPRE en loop para que no se detenga
  newAction.setEffectiveWeight(1.0);
  newAction.timeScale = styleConfig.tempo; // Aplicar tempo específico del estilo
  newAction.clampWhenFinished = false;
  
  // Reproducir la nueva acción
  newAction.play();
  currentAction = newAction; // Guardar referencia a la acción actual
  params.tempo = styleConfig.tempo; // Actualizar tempo en parámetros
  
  // Configurar pasos específicos para este estilo
  configureDanceSteps(danceStyle, styleConfig);

  // Actualizar información visual del panel
  updateDanceInfo();

  // Verificar que la animación se está reproduciendo correctamente
  setTimeout(() => {
    if (newAction.isRunning()) {
      console.log("✅ Animación reproduciéndose correctamente");
    } else {
      console.log("❌ Animación no se está reproduciendo, reintentando...");
      newAction.reset();
      newAction.play();
    }
  }, 200);

  // Log de información del estilo aplicado
  console.log(`🎭 Aplicado ${danceStyle}: ${styleConfig.description}`);
  console.log(`🎵 Tempo: ${styleConfig.tempo}x`);
  console.log(`🎬 Animación: ${animations[animationIndex].name || 'Sin nombre'}`);
}

// Función para cambiar el estilo de baile con verificaciones de seguridad
function changeDanceStyle(danceStyle) {
  console.log(`🔄 Cambiando a estilo: ${danceStyle}`);
  
  // Verificar que tenemos el modelo correcto
  if (params.asset !== "Samba Dancing") {
    console.log("⚠️ Modelo incorrecto. Selecciona 'Samba Dancing' primero.");
    return;
  }
  
  // Verificar que el mixer esté disponible
  if (!mixer) {
    console.log("⚠️ Mixer no disponible. Cargando modelo...");
    loadAsset("Samba Dancing");
    return;
  }
  
  // Verificar que hay animaciones disponibles
  if (!animations || animations.length === 0) {
    console.log("⚠️ No hay animaciones disponibles. Cargando modelo...");
    loadAsset("Samba Dancing");
    return;
  }
  
  // Aplicar el nuevo estilo si todo está correcto
  applyDanceStyle(danceStyle);
}

// Función para crear variaciones de animación más realistas
function createRealisticDanceVariations() {
  if (!mixer || !currentAction) return;

  // Aplicar pequeñas variaciones aleatorias para hacer el baile más natural
  const variation = (Math.random() - 0.5) * 0.1; // ±5% de variación
  currentAction.timeScale = params.tempo + variation;
}

// Configuración específica de pasos para cada estilo de samba
const danceStepConfigs = {
  "Samba Básico": {
    hipMovement: { amplitude: 0.3, frequency: 2.0, phase: 0 },
    shoulderMovement: { amplitude: 0.2, frequency: 1.5, phase: Math.PI/4 },
    footSteps: { amplitude: 0.4, frequency: 4.0, phase: 0 },
    bodySway: { amplitude: 0.1, frequency: 1.0, phase: Math.PI/2 }
  },
  "Samba Reggae": {
    hipMovement: { amplitude: 0.5, frequency: 1.5, phase: Math.PI/3 },
    shoulderMovement: { amplitude: 0.3, frequency: 1.2, phase: Math.PI/6 },
    footSteps: { amplitude: 0.2, frequency: 3.0, phase: Math.PI/2 },
    bodySway: { amplitude: 0.2, frequency: 0.8, phase: 0 }
  },
  "Samba Enredo": {
    hipMovement: { amplitude: 0.4, frequency: 3.0, phase: Math.PI/4 },
    shoulderMovement: { amplitude: 0.4, frequency: 2.5, phase: Math.PI/8 },
    footSteps: { amplitude: 0.6, frequency: 5.0, phase: 0 },
    bodySway: { amplitude: 0.15, frequency: 1.5, phase: Math.PI/3 }
  },
  "Samba Rock": {
    hipMovement: { amplitude: 0.6, frequency: 2.5, phase: Math.PI/6 },
    shoulderMovement: { amplitude: 0.5, frequency: 2.0, phase: Math.PI/4 },
    footSteps: { amplitude: 0.5, frequency: 4.5, phase: Math.PI/3 },
    bodySway: { amplitude: 0.2, frequency: 1.2, phase: Math.PI/2 }
  },
  "Samba Pagode": {
    hipMovement: { amplitude: 0.2, frequency: 1.8, phase: Math.PI/5 },
    shoulderMovement: { amplitude: 0.15, frequency: 1.3, phase: Math.PI/7 },
    footSteps: { amplitude: 0.3, frequency: 3.5, phase: Math.PI/4 },
    bodySway: { amplitude: 0.08, frequency: 0.9, phase: Math.PI/6 }
  }
};

// Función para configurar pasos específicos de cada estilo
function configureDanceSteps(danceStyle, styleConfig) {
  console.log(`🕺 Configurando pasos únicos para: ${danceStyle}`);
  
  // Guardar la configuración del estilo actual
  window.currentDanceConfig = danceStepConfigs[danceStyle] || danceStepConfigs["Samba Básico"];
  window.currentDanceStyle = danceStyle;
  
  console.log(`🎭 Pasos configurados:`, window.currentDanceConfig);
}

// Función para aplicar técnicas de samba más realistas
function applyRealisticSambaTechniques() {
  if (!object || !mixer || !currentAction || !window.currentDanceConfig) return;

  const time = Date.now() * 0.001;
  const config = window.currentDanceConfig;

  // Simular movimientos de cadera característicos de la samba
  object.traverse(function (child) {
    if (child.isSkinnedMesh && child.skeleton) {
      // Movimiento de cadera específico del estilo
      const hipRotation = Math.sin(time * params.tempo * config.hipMovement.frequency + config.hipMovement.phase) * 
                         config.hipMovement.amplitude * params.hipMovement;
      
      // Buscar el hueso de la cadera (hip bone)
      const hipBone = child.skeleton.bones.find(bone => 
        bone.name.toLowerCase().includes('hip') || 
        bone.name.toLowerCase().includes('pelvis')
      );
      
      if (hipBone) {
        hipBone.rotation.y += hipRotation * 0.01;
      }
      
      // Movimiento de hombros específico del estilo
      const shoulderRotation = Math.sin(time * params.tempo * config.shoulderMovement.frequency + config.shoulderMovement.phase) * 
                              config.shoulderMovement.amplitude;
      
      const shoulderBones = child.skeleton.bones.filter(bone => 
        bone.name.toLowerCase().includes('shoulder') || 
        bone.name.toLowerCase().includes('clavicle')
      );
      
      shoulderBones.forEach((bone, index) => {
        const phase = (index % 2) * Math.PI;
        bone.rotation.z += shoulderRotation * 0.005 * Math.sin(time + phase);
      });
      
      // Movimiento de balanceo del cuerpo
      const bodySway = Math.sin(time * params.tempo * config.bodySway.frequency + config.bodySway.phase) * 
                      config.bodySway.amplitude;
      
      const spineBone = child.skeleton.bones.find(bone => 
        bone.name.toLowerCase().includes('spine') || 
        bone.name.toLowerCase().includes('chest')
      );
      
      if (spineBone) {
        spineBone.rotation.z += bodySway * 0.003;
      }
    }
  });
}

// Función para simular pasos de samba auténticos
function simulateAuthenticSambaSteps() {
  if (!object || !mixer || !currentAction || !window.currentDanceConfig) return;

  const time = Date.now() * 0.001;
  const config = window.currentDanceConfig;

  // Aplicar micro-movimientos a los pies para simular pasos reales específicos del estilo
  object.traverse(function (child) {
    if (child.isSkinnedMesh && child.skeleton) {
      // Buscar huesos de los pies
      const footBones = child.skeleton.bones.filter(bone => 
        bone.name.toLowerCase().includes('foot') || 
        bone.name.toLowerCase().includes('toe') ||
        bone.name.toLowerCase().includes('ankle')
      );
      
      footBones.forEach((bone, index) => {
        // Aplicar movimiento alternado entre pies con configuración específica del estilo
        const phase = (index % 2) * Math.PI;
        const stepMovement = Math.sin(time * params.tempo * config.footSteps.frequency + 
                                     config.footSteps.phase + phase) * 
                            config.footSteps.amplitude * params.stepIntensity;
        
        // Movimiento vertical de los pasos
        bone.position.y += stepMovement * 0.008;
        
        // Movimiento lateral sutil para simular el balanceo
        bone.position.x += Math.sin(time * params.tempo * 2 + phase) * 0.003 * params.stepIntensity;
        
        // Rotación sutil del pie para simular el movimiento natural
        bone.rotation.z += Math.sin(time * params.tempo * 3 + phase) * 0.01 * params.stepIntensity;
      });
      
      // Movimientos específicos de rodillas para cada estilo
      const kneeBones = child.skeleton.bones.filter(bone => 
        bone.name.toLowerCase().includes('knee') || 
        bone.name.toLowerCase().includes('leg')
      );
      
      kneeBones.forEach((bone, index) => {
        const phase = (index % 2) * Math.PI;
        const kneeMovement = Math.sin(time * params.tempo * config.footSteps.frequency * 0.7 + phase) * 
                            config.footSteps.amplitude * 0.5;
        
        bone.rotation.x += kneeMovement * 0.005 * params.stepIntensity;
      });
    }
  });
}

// Función para mostrar información del baile
function showDanceInfo() {
  const danceInfo = document.getElementById('dance-info');
  if (danceInfo) {
    danceInfo.style.display = 'block';
    updateDanceInfo();
  }
}

// Función para ocultar información del baile
function hideDanceInfo() {
  const danceInfo = document.getElementById('dance-info');
  if (danceInfo) {
    danceInfo.style.display = 'none';
  }
}

// Función para actualizar la información del baile mostrada
function updateDanceInfo() {
  const danceInfo = document.getElementById('dance-info');
  if (!danceInfo || params.asset !== "Samba Dancing") return;

  const styleConfig = danceStyles[params.danceStyle];
  if (!styleConfig) return;

  const title = document.getElementById('dance-title');
  const description = document.getElementById('dance-description');
  const tempo = document.getElementById('dance-tempo');
  const statusIndicator = document.getElementById('status-indicator');

  if (title) title.textContent = params.danceStyle;
  if (description) description.textContent = styleConfig.description;
  if (tempo) tempo.textContent = `Tempo: ${params.tempo}x`;
  
  // Actualizar estado de la animación
  if (statusIndicator) {
    if (currentAction && currentAction.isRunning()) {
      statusIndicator.textContent = "▶️ Reproduciendo";
      statusIndicator.style.color = "#4CAF50";
    } else {
      statusIndicator.textContent = "⏸️ Detenido";
      statusIndicator.style.color = "#F44336";
    }
  }
}

// Función para reset completo del sistema de baile
function resetDanceSystem() {
  console.log("🔄 Iniciando reset completo del sistema de baile...");
  
  // Detener y limpiar la acción actual
  if (currentAction) {
    currentAction.stop();
    currentAction.reset();
    currentAction.enabled = false;
    currentAction = null;
  }
  
  // Limpiar el mixer
  if (mixer) {
    mixer.stopAllAction();
    mixer.uncacheRoot(object);
  }
  
  // Recargar el modelo completamente
  if (params.asset === "Samba Dancing") {
    console.log("🔄 Recargando modelo Samba Dancing...");
    loadAsset("Samba Dancing");
  }
  
  console.log("✅ Reset completo finalizado");
}
