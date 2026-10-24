
(() => {
  "use strict";

  const PROJECTS = {
    flowpilot: {
      category: "AI PRODUCT ENGINEERING",
      title: "FlowPilot",
      number: "01 / 04",
      description: "An AI-powered project management platform that generates task breakdowns, sprint risk analysis and weekly status reports from live project context. A deterministic fallback keeps core insights dependable when the AI provider is unavailable.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Groq API"],
      live: "https://flowpilot-ai-virid.vercel.app",
      liveLabel: "Open live product",
      source: "https://github.com/Hafiz-alt/flowpilot-ai",
      color: 0x95e0a6
    },
    isl: {
      category: "COMPUTER VISION / ACCESSIBILITY",
      title: "ISL Translator",
      number: "02 / 04",
      description: "A real-time Indian Sign Language alphabet recognizer using MobileNetV2 transfer learning. Webcam inference, confidence scoring and offline text-to-speech feedback bring the model into a usable application.",
      tech: ["Python", "Flask", "TensorFlow", "MobileNetV2", "Offline TTS"],
      live: "https://huggingface.co/spaces/hafiz88172/ISL-Translator",
      liveLabel: "Open live demo",
      source: "https://github.com/Hafiz-alt/Sign-Language-Translator",
      color: 0x91dce0
    },
    spotsaver: {
      category: "MOBILE PRODUCT / OFFLINE FIRST",
      title: "SpotSaver",
      number: "03 / 04",
      description: "A cross-platform parking companion for saving GPS locations, photos and notes, with countdown timers and return-to-car navigation. Local-first storage keeps saved information available without depending on a constant connection.",
      tech: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
      live: "",
      liveLabel: "",
      source: "https://github.com/Hafiz-alt/spotsaver",
      color: 0x8ed7e9
    },
    exowaste: {
      category: "SUSTAINABILITY / FULL STACK",
      title: "ExoWaste",
      number: "04 / 04",
      description: "An award-winning e-waste management platform for pickup scheduling, collection workflows and marketplace activity, with Supabase authentication and real-time updates. Recipient of the Best Project Award 2025.",
      tech: ["React", "Vite", "Supabase", "Role-based workflows"],
      live: "https://exowaste.vercel.app/",
      liveLabel: "Open live product",
      source: "https://github.com/Hafiz-alt/ewastefinalproject",
      color: 0xc5f36b
    }
  };

  const initProjectLab = () => {
    const canvas = document.getElementById("projectLabCanvas");
    const stage = document.getElementById("projectLabStage");
    if (!canvas || !stage) return;

    const fallback = document.getElementById("projectLabFallback");
    const title = document.getElementById("labTitle");
    const category = document.getElementById("labCategory");
    const number = document.getElementById("labNumber");
    const description = document.getElementById("labDescription");
    const techList = document.getElementById("labTech");
    const liveLink = document.getElementById("labLiveLink");
    const codeLink = document.getElementById("labCodeLink");
    const sceneStatus = document.getElementById("labSceneStatus");
    const selectors = Array.from(document.querySelectorAll("[data-project-select]"));
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeProject = "flowpilot";
    const artifacts = {};
    let renderOnce = () => {};

    const selectProject = (key) => {
      const data = PROJECTS[key];
      if (!data) return;
      activeProject = key;
      if (category) category.textContent = data.category;
      if (title) title.textContent = data.title;
      if (number) number.textContent = data.number;
      if (description) description.textContent = data.description;
      if (techList) techList.replaceChildren(...data.tech.map((item) => {
        const span = document.createElement("span");
        span.textContent = item;
        return span;
      }));
      if (codeLink) codeLink.href = data.source;
      if (liveLink) {
        liveLink.hidden = !data.live;
        if (data.live) {
          liveLink.href = data.live;
          const label = liveLink.querySelector("span");
          if (label) label.textContent = data.liveLabel;
        }
      }
      selectors.forEach((button) => {
        const selected = button.dataset.projectSelect === key;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      if (sceneStatus) sceneStatus.textContent = "SCENE " + data.number.replace(" / ", " — ") + " SELECTED";
      Object.entries(artifacts).forEach(([artifactKey, object]) => {
        object.traverse((child) => {
          if (child.material && "emissiveIntensity" in child.material) {
            child.material.emissiveIntensity = artifactKey === key ? 0.42 : 0.12;
          }
        });
      });
    };

    selectors.forEach((button) => button.addEventListener("click", () => {
      selectProject(button.dataset.projectSelect);
      renderOnce();
    }));

    if (!window.THREE) {
      if (fallback) fallback.classList.add("visible");
      canvas.style.display = "none";
      return;
    }

    const THREE = window.THREE;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch (error) {
      if (fallback) fallback.classList.add("visible");
      canvas.style.display = "none";
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    if ("outputEncoding" in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.03, 7.7);

    scene.add(new THREE.AmbientLight(0xd9f4df, 1.12));
    const keyLight = new THREE.PointLight(0xb9f58b, 2.15, 18);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x6ccfc0, 1.6, 16);
    rimLight.position.set(3, 1, -2);
    scene.add(rimLight);
    const warmLight = new THREE.PointLight(0xd9b778, 0.8, 12);
    warmLight.position.set(1, -2, 4);
    scene.add(warmLight);

    const root = new THREE.Group();
    scene.add(root);
    const clickable = [];
    const sharedMaterial = (color, roughness, metalness, emissive) => new THREE.MeshStandardMaterial({
      color,
      roughness: roughness === undefined ? 0.44 : roughness,
      metalness: metalness === undefined ? 0.18 : metalness,
      emissive: emissive || 0x000000,
      emissiveIntensity: emissive ? 0.15 : 0
    });

    const materials = {
      green: sharedMaterial(0x91bd7f, 0.35, 0.25, 0x234021),
      lime: sharedMaterial(0xc5f36b, 0.32, 0.25, 0x425c16),
      dark: sharedMaterial(0x1a2d20, 0.5, 0.35),
      screen: sharedMaterial(0x07130d, 0.3, 0.1, 0x081b10),
      mint: sharedMaterial(0x8ee0c1, 0.3, 0.22, 0x1e5440),
      gold: sharedMaterial(0xd9b778, 0.34, 0.25, 0x453014),
      ivory: sharedMaterial(0xcbd9c5, 0.42, 0.16),
      blue: sharedMaterial(0x8ed7e9, 0.32, 0.22, 0x1b4b57)
    };

    const mesh = (parent, geometry, material, position, rotation) => {
      const node = new THREE.Mesh(geometry, material.clone());
      if (position) node.position.set(position[0], position[1], position[2]);
      if (rotation) node.rotation.set(rotation[0], rotation[1], rotation[2]);
      parent.add(node);
      return node;
    };

    const box = (parent, size, material, position, rotation) =>
      mesh(parent, new THREE.BoxGeometry(size[0], size[1], size[2]), material, position, rotation);
    const addArtifact = (key, group, position) => {
      group.position.set(position[0], position[1], position[2]);
      group.userData.projectKey = key;
      group.userData.baseY = position[1];
      group.userData.phase = Object.keys(artifacts).length * 1.2;
      group.traverse((child) => {
        if (child.isMesh) {
          child.userData.projectKey = key;
          clickable.push(child);
        }
      });
      artifacts[key] = group;
      root.add(group);
    };

    // Desktop surface, bevelled edge and riser.
    box(root, [4.65, 0.18, 2.15], materials.dark, [0, -1.38, 0], [0, -0.035, 0]);
    box(root, [4.7, 0.045, 2.18], materials.green, [0, -1.275, 0]);
    box(root, [2.42, 0.12, 0.11], materials.dark, [0, -0.57, -0.5]);
    box(root, [0.18, 0.72, 0.14], materials.dark, [0, -0.92, -0.5]);
    box(root, [1.1, 0.08, 0.42], materials.dark, [0, -1.22, -0.36]);

    // Monitor housing, screen, information panels and tiny chart bars.
    box(root, [2.6, 1.62, 0.16], sharedMaterial(0x26382a, 0.36, 0.42), [0, 0.03, -0.52]);
    box(root, [2.42, 1.43, 0.025], materials.screen, [0, 0.04, -0.425]);
    box(root, [1.05, 0.065, 0.02], materials.lime, [-0.55, 0.53, -0.4]);
    box(root, [0.72, 0.035, 0.02], materials.ivory, [-0.38, 0.39, -0.4]);
    box(root, [0.98, 0.43, 0.018], sharedMaterial(0x11291b, 0.4, 0.1), [-0.59, -0.01, -0.398]);
    box(root, [0.98, 0.43, 0.018], sharedMaterial(0x10221e, 0.4, 0.1), [0.51, -0.01, -0.398]);
    box(root, [0.76, 0.035, 0.018], materials.mint, [0.42, 0.48, -0.39]);
    box(root, [0.49, 0.025, 0.018], materials.green, [0.28, 0.38, -0.39]);
    [0.22, 0.34, 0.29, 0.49, 0.57, 0.75].forEach((height, i) => {
      box(root, [0.085, height, 0.025], i === 5 ? materials.lime : materials.green, [0.19 + i * 0.12, -0.22 + height / 2, -0.38]);
    });
    [0, 1, 2].forEach((i) => box(root, [0.24, 0.105, 0.025], i === 1 ? materials.gold : materials.mint, [-0.88 + i * 0.31, -0.16, -0.37]));

    // Keyboard with individual raised keycaps.
    const keyboard = new THREE.Group();
    root.add(keyboard);
    box(keyboard, [1.55, 0.085, 0.54], sharedMaterial(0x1a2a1e, 0.52, 0.26), [0, -1.16, 0.43], [-0.08, 0, 0]);
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 12; col += 1) {
        box(keyboard, [0.085, 0.022, 0.09], row === 0 && col === 0 ? materials.lime : materials.green,
          [-0.68 + col * 0.122, -1.105, 0.25 + row * 0.13]);
      }
    }

    // Small sculptural desk lamp.
    const lamp = new THREE.Group();
    lamp.position.set(-2.02, -1.14, -0.45);
    root.add(lamp);
    mesh(lamp, new THREE.CylinderGeometry(0.22, 0.24, 0.06, 28), materials.gold, [0, 0.01, 0]);
    mesh(lamp, new THREE.CylinderGeometry(0.035, 0.045, 0.58, 12), materials.dark, [-0.02, 0.3, 0], [0, 0, -0.24]);
    mesh(lamp, new THREE.CylinderGeometry(0.13, 0.21, 0.19, 24), materials.gold, [-0.12, 0.59, 0], [0, 0, -0.45]);
    mesh(lamp, new THREE.SphereGeometry(0.06, 12, 12), materials.lime, [-0.12, 0.48, 0.015]);

    // FlowPilot: central automation cube joined to three data nodes.
    const flow = new THREE.Group();
    mesh(flow, new THREE.BoxGeometry(0.37, 0.37, 0.37), materials.mint, [0, 0, 0], [0.25, 0.25, 0.25]);
    [[-0.35, 0.25, 0], [0.35, 0.26, 0], [0, -0.37, 0.05]].forEach((p, i) => {
      mesh(flow, new THREE.SphereGeometry(0.13, 18, 18), i === 1 ? materials.lime : materials.green, p);
      mesh(flow, new THREE.CylinderGeometry(0.018, 0.018, 0.42, 8), materials.ivory,
        [p[0] * 0.52, p[1] * 0.52, 0], [0, 0, Math.atan2(p[0], p[1])]);
    });
    addArtifact("flowpilot", flow, [-1.75, 0.84, 0.52]);

    // ISL Translator: stylised hand glyph inside a scan frame.
    const hand = new THREE.Group();
    mesh(hand, new THREE.BoxGeometry(0.34, 0.31, 0.12), materials.blue, [0, -0.12, 0], [0, 0, -0.08]);
    const fingerLengths = [0.47, 0.63, 0.71, 0.6, 0.42];
    const fingerX = [-0.24, -0.12, 0, 0.12, 0.24];
    fingerLengths.forEach((length, i) => {
      mesh(hand, new THREE.CylinderGeometry(0.045, 0.052, length, 12), i === 2 ? materials.ivory : materials.blue,
        [fingerX[i], 0.15 + length * 0.28, 0], [0, 0, (i - 2) * -0.09]);
      mesh(hand, new THREE.SphereGeometry(0.047, 12, 12), i === 2 ? materials.lime : materials.blue,
        [fingerX[i] + (i - 2) * 0.025, 0.15 + length * 0.28 + length / 2, 0]);
    });
    mesh(hand, new THREE.CylinderGeometry(0.04, 0.05, 0.33, 12), materials.mint, [-0.31, -0.06, 0.015], [0, 0, -0.72]);
    mesh(hand, new THREE.TorusGeometry(0.46, 0.012, 8, 48), materials.blue, [0, 0.12, -0.13]);
    addArtifact("isl", hand, [1.75, 0.84, 0.48]);

    // SpotSaver: GPS beacon with two navigation rings.
    const pin = new THREE.Group();
    mesh(pin, new THREE.SphereGeometry(0.27, 24, 24), materials.blue, [0, 0.1, 0]);
    mesh(pin, new THREE.ConeGeometry(0.24, 0.47, 28), materials.blue, [0, -0.22, 0], [Math.PI, 0, 0]);
    mesh(pin, new THREE.SphereGeometry(0.095, 18, 18), materials.ivory, [0, 0.1, 0.245]);
    mesh(pin, new THREE.TorusGeometry(0.48, 0.018, 8, 44), materials.mint, [0, -0.25, -0.04], [Math.PI / 2.5, 0, 0.25]);
    mesh(pin, new THREE.TorusGeometry(0.65, 0.009, 7, 44), materials.blue, [0, -0.25, -0.08], [Math.PI / 2.5, 0, 0.25]);
    addArtifact("spotsaver", pin, [-1.75, -0.28, 0.72]);

    // ExoWaste: circular economy loop with three material nodes.
    const recycle = new THREE.Group();
    mesh(recycle, new THREE.TorusGeometry(0.4, 0.075, 16, 64), materials.lime, [0, 0, 0], [Math.PI / 2.6, 0.15, -0.3]);
    mesh(recycle, new THREE.TorusGeometry(0.24, 0.026, 10, 48), materials.green, [0, 0, 0.04], [Math.PI / 2.6, 0.15, -0.3]);
    [[0, 0.47, 0.02], [-0.43, -0.2, 0.02], [0.4, -0.23, 0.02]].forEach((p, i) => {
      mesh(recycle, new THREE.OctahedronGeometry(0.13, 0), i === 1 ? materials.gold : materials.mint, p, [0, i * 0.7, i * 0.2]);
    });
    addArtifact("exowaste", recycle, [1.75, -0.28, 0.68]);

    // Very subtle base rings anchor the scene to the desk.
    mesh(root, new THREE.TorusGeometry(2.15, 0.009, 6, 96), materials.green, [0, -0.28, -0.35], [Math.PI / 2.4, 0, 0]);
    mesh(root, new THREE.TorusGeometry(2.55, 0.006, 6, 96), materials.dark, [0, -0.27, -0.4], [Math.PI / 2.4, 0, 0]);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let dragging = false;
    let moved = false;
    let isPointerDown = false;
    let userInteracted = false;
    let pointerStart = { x: 0, y: 0, rx: 0, ry: 0 };

    const resize = () => {
      const width = Math.max(260, stage.clientWidth);
      const height = Math.max(280, canvas.clientHeight || 440);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 480 ? 9.2 : (width < 640 ? 8.4 : 7.7);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    };

    canvas.addEventListener("pointerdown", (event) => {
      isPointerDown = true;
      dragging = true;
      moved = false;
      pointerStart = { x: event.clientX, y: event.clientY, rx: root.rotation.x, ry: root.rotation.y };
      if (canvas.setPointerCapture) canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      updatePointer(event);
      if (dragging && isPointerDown) {
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        if (Math.abs(dx) + Math.abs(dy) > 5) {
          moved = true;
          userInteracted = true;
        }
        root.rotation.y = pointerStart.ry + dx * 0.006;
        root.rotation.x = Math.max(-0.22, Math.min(0.22, pointerStart.rx + dy * 0.003));
      } else {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(clickable, false);
        canvas.style.cursor = hits.length ? "pointer" : "grab";
      }
    });

    const pointerUp = (event) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      dragging = false;
      if (!moved) {
        updatePointer(event);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(clickable, false);
        if (hits.length) {
          const key = hits[0].object.userData.projectKey;
          if (key) selectProject(key);
        }
      }
      renderOnce();
    };
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    canvas.addEventListener("keydown", (event) => {
      const keys = Object.keys(PROJECTS);
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        selectProject(keys[(keys.indexOf(activeProject) + 1) % keys.length]);
        renderOnce();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        selectProject(keys[(keys.indexOf(activeProject) - 1 + keys.length) % keys.length]);
        renderOnce();
      }
    });

    const clock = new THREE.Clock();
    renderOnce = () => renderer.render(scene, camera);
    const animate = () => {
      const time = clock.getElapsedTime();
      Object.entries(artifacts).forEach(([key, object]) => {
        if (!dragging && !reducedMotion) {
          object.position.y = object.userData.baseY + Math.sin(time * 1.1 + object.userData.phase) * 0.055;
          object.rotation.y += key === activeProject ? 0.004 : 0.0016;
        }
        const targetScale = key === activeProject ? 1.1 : 1;
        object.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.09);
      });
      if (!dragging && !userInteracted && !reducedMotion) root.rotation.y = Math.sin(time * 0.18) * 0.045;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
    window.addEventListener("resize", resize, { passive: true });
    resize();
    selectProject("flowpilot");
    animate();
    if (fallback) fallback.classList.remove("visible");
    if (sceneStatus) sceneStatus.textContent = "SCENE 01 — READY";
  };

  const showFallback = (message) => {
    const canvas = document.getElementById("projectLabCanvas");
    const fallback = document.getElementById("projectLabFallback");
    const status = document.getElementById("labSceneStatus");
    if (canvas) canvas.style.display = "none";
    if (fallback) {
      fallback.classList.add("visible");
      const copy = fallback.querySelector("span");
      if (copy) copy.textContent = message || "3D graphics could not start here. Use the project selector to explore the work.";
    }
    if (status) status.textContent = "PROJECT SELECTOR READY";
  };

  const bootProjectLab = () => {
    if (window.THREE) {
      try { initProjectLab(); } catch (error) { showFallback("3D engine error. The project selector is still available."); }
      return;
    }
    const sources = [
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.128.0/three.min.js",
      "https://unpkg.com/three@0.128.0/build/three.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"
    ];
    let index = 0;
    const tryNextSource = () => {
      if (window.THREE) {
        try { initProjectLab(); } catch (error) { showFallback("3D engine error. The project selector is still available."); }
        return;
      }
      if (index >= sources.length) {
        showFallback("The 3D library could not load. Use the project selector to explore every project.");
        return;
      }
      const script = document.createElement("script");
      script.src = sources[index++];
      script.async = true;
      let settled = false;
      const timer = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        script.remove();
        tryNextSource();
      }, 7000);
      script.onload = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        if (window.THREE) {
          try { initProjectLab(); } catch (error) { showFallback("3D engine error. The project selector is still available."); }
        } else {
          script.remove();
          tryNextSource();
        }
      };
      script.onerror = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        script.remove();
        tryNextSource();
      };
      document.head.appendChild(script);
    };
    tryNextSource();
  };

  const boot = () => bootProjectLab();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
