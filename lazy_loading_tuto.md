# Understanding lazy loading in this portfolio

## 1. What problem are we solving?

The portfolio uses Three.js, React Three Fiber, and Drei to display interactive 3D scenes. These libraries provide a rendering engine, React integration, lighting helpers, controls, and asset loaders, but they add substantial JavaScript.

Previously, the page imported both 3D scenes directly. The browser downloaded their code and the shared 3D libraries as part of the main JavaScript bundle, even when the visitor had not scrolled to the sphere.

Lazy loading means **waiting until something is needed before loading it**.

This implementation combines two techniques:

1. **Code splitting:** put the 3D code into separately downloadable bundles.
2. **Viewport-based mounting:** render a scene only when its container approaches the visible area of the browser.

These are different ideas. Code splitting alone does not mean “wait until the visitor scrolls.” We need both techniques for that behavior.

## 2. Which files are involved?

| File                                                                     | Responsibility                                                                                                                   |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| [src/App.tsx](src/App.tsx)                                               | Declares the banner scene as a lazy component and wraps it in `DeferredScene`.                                                   |
| [src/components/DeferredScene.tsx](src/components/DeferredScene.tsx)     | Watches a container and renders its children when it is near the viewport. Supplies a JavaScript-loading placeholder.            |
| [src/components/Scene3d_3.tsx](src/components/Scene3d_3.tsx)             | Keeps the sphere section's heading, text, buttons, and selected material available without importing the 3D renderer at runtime. |
| [src/components/Scene3d_3Canvas.tsx](src/components/Scene3d_3Canvas.tsx) | Contains the deferred sphere canvas, shader material, HDR environment, and orbit controls.                                       |
| [src/components/Scene3d_3.css](src/components/Scene3d_3.css)             | Reserves the sphere canvas's height before it loads.                                                                             |

## 3. Step one: split the code with `React.lazy()`

The sphere section declares its canvas like this:

```tsx
const Scene3d_3Canvas = lazy(() => import("./Scene3d_3Canvas"));
```

Here is what each part does:

- `import()` is a **dynamic import**. It returns a promise for a module rather than statically importing it into the current module.
- Vite detects the dynamic import and creates a separate production chunk, plus any chunks shared with other imports.
- `lazy()` turns that asynchronous module loader into a React component.
- React calls the loader when it first tries to render the lazy component—not simply when the `lazy()` declaration runs.
- React remembers the loader's result, so ordinary rerenders do not download the module again.

Declare lazy components outside component functions, as this project does. Redeclaring them during renders can create new component identities and reset state.

### Why is the banner import a little different?

The banner scene uses a named export, `Scene3D_2`, whereas `React.lazy()` expects the resolved module to have a `default` component export. The adapter in [src/App.tsx](src/App.tsx) supplies that shape:

```tsx
const Scene3D_2 = lazy(() =>
  import("./components/Scene3D_2").then((module) => ({
    default: module.Scene3D_2,
  })),
);
```

The sphere canvas already has a default export, so it does not need this adapter.

## 4. Step two: wait until the scene is near the viewport

The viewport is the visible area of the browser window.

`DeferredScene` uses the browser's `IntersectionObserver` API to detect when its container approaches that area. This avoids manually checking scroll position on every scroll event.

### Keep a reference to the container

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const [isNearViewport, setIsNearViewport] = useState(false);
```

- `containerRef` gives the effect access to the actual DOM element.
- `isNearViewport` starts as `false`, so the 3D child is not rendered yet.

### Observe its position

```tsx
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsNearViewport(true);
      observer.disconnect();
    }
  },
  { rootMargin: "250px" },
);

observer.observe(container);
```

No custom `root` is specified, so the observer uses the browser viewport.

`rootMargin: "250px"` expands the observed area by 250 pixels on all four sides. A scene can therefore start loading shortly **before** it becomes visible. This is a distance threshold, not a time delay: a fast connection and a slow connection get the same 250-pixel head start.

When the container intersects that expanded area:

1. The state becomes `true`.
2. React rerenders `DeferredScene`.
3. React tries to render its children.
4. The lazy import begins if its module is not already loaded.
5. The observer disconnects because it has finished its job.

Creating a JSX element such as `<Scene3d_3Canvas />` in the parent does not by itself render it. `DeferredScene` initially withholds that element from the rendered tree, which is why the lazy import waits.

### Cleanup and compatibility

The effect returns `observer.disconnect()` as its cleanup. This stops observing if the wrapper unmounts before its scene loads.

For browsers without `IntersectionObserver`, the implementation schedules `setIsNearViewport(true)` with `requestAnimationFrame`. Those browsers still get the scene, just without viewport-based deferral. The cleanup cancels that scheduled callback if necessary.

## 5. Step three: show loading feedback with `Suspense`

The wrapper renders this once the scene is near the viewport:

```tsx
<Suspense fallback={<p role="status">Loading 3D preview…</p>}>
  {children}
</Suspense>
```

A lazy component suspends while its module is loading. `Suspense` displays its `fallback` until the component is ready.

Before the viewport trigger, this wrapper renders no child or loading message. After the trigger, it can show the loading message while the JavaScript arrives.

There is a second `Suspense` boundary **inside** the sphere canvas. It displays “Loading materials…” using Drei's `Html` helper while the HDR environment is loading.

The two boundaries have different jobs:

| Boundary                               | What it is primarily waiting for                            |
| -------------------------------------- | ----------------------------------------------------------- |
| Outside the canvas, in `DeferredScene` | The dynamically imported scene JavaScript.                  |
| Inside `Scene3d_3Canvas`               | Suspense-aware scene assets, including the HDR environment. |

The canvas's own `fallback` about WebGL is different again: it handles unavailable WebGL, not ordinary module downloading.

**Important:** `Suspense` handles waiting, not every possible error. The current implementation does not add an error boundary for a failed dynamic import or failed HDR download.

## 6. Why split the sphere section into two components?

The sphere showcase has inexpensive HTML content and expensive 3D content.

**The immediately available section includes:**

- The heading and explanatory text.
- Copper, Gold, and Iron buttons.
- The selected material state and description.
- The empty, reserved canvas area.

**The deferred canvas includes:**

- React Three Fiber's `Canvas`.
- Three.js geometry and shader materials.
- Drei's HDR environment and orbit controls.

The parent uses a type-only import for `ShowcaseMaterial`:

```tsx
import type { ShowcaseMaterial } from "../materials/showcaseMaterials";
```

TypeScript removes this import from the emitted JavaScript. It provides type safety without pulling the material module and its Three.js dependency into the initial runtime bundle.

The parent passes the current selection to the lazy canvas:

```tsx
<DeferredScene>
  <Scene3d_3Canvas surface={surface} />
</DeferredScene>
```

If the selected material changes before the canvas mounts, the canvas receives the latest `surface` value when it eventually renders.

## 7. Preventing the page from jumping

The canvas container has a height before its contents load:

```css
height: clamp(300px, 48vw, 480px);
```

This reserves between 300 and 480 pixels, depending on the viewport width. `DeferredScene` fills that parent container with `width: "100%"` and `height: "100%"`.

Without reserved space, loading a canvas could push the rest of the page downward. Reserving dimensions also gives the observer a meaningful area to watch.

The banner already has a sized container, so it also provides space for its deferred scene.

## 8. What happens when scrolling away?

After the trigger, `isNearViewport` stays `true`. The observer disconnects and the scene remains mounted when scrolling away and back.

This is intentional:

- Camera and interaction state are preserved.
- The WebGL canvas is not repeatedly destroyed and recreated.
- The wrapper does not repeatedly trigger scene initialization.

However, **lazy loading is not automatic offscreen pausing or unloading**. Mounted scenes still use memory. An animated scene can continue rendering offscreen.

The sphere uses `frameloop="demand"`, which renders when React Three Fiber requests an update rather than continuously rendering an idle scene. That is a separate optimization from lazy loading. The banner still has its existing animation behavior.

## 9. Results and the remaining bundle warning

The production builds measured during this change reported:

| Output                              |         Before |        After |
| ----------------------------------- | -------------: | -----------: |
| Main JavaScript, before compression | About 1,091 kB | About 205 kB |
| Main JavaScript, gzip size          |   About 311 kB |  About 67 kB |

The later build also produced separate scene chunks and a shared 3D dependency chunk of approximately **855 kB before compression**, or **235 kB gzip**. These measurements will change as the project changes. Gzip sizes describe transfer size only when the server serves gzip-compressed content; servers may use another compression format instead.

The remaining warning is expected: a shared 3D chunk still exceeds Vite's 500 kB warning threshold. Lazy loading improves **when code is requested**, not necessarily the total size downloaded by someone who visits every scene.

Also, the banner is near the top of the page. It will usually trigger quickly, so the shared Three.js code may still download soon after the first page render. The lower sphere scene can reuse those shared libraries, while its scene-specific code and HDR request remain deferred until it mounts.

The benefit is a smaller initial application bundle and more control over when expensive scenes initialize—not a guarantee that every 3D dependency waits until the sphere is visible.

## 10. How to observe it in the browser

1. Open browser developer tools and select the **Network** panel.
2. Disable the browser cache while developer tools are open.
3. Choose a slower network preset to make loading easier to notice.
4. Reload the page while positioned at the top.
5. Watch for the banner scene and shared 3D dependencies to load early.
6. Scroll toward the sphere section.
7. Watch for the sphere canvas module and its HDR request as its container enters the 250-pixel margin.
8. Scroll away and return. The scene should stay mounted rather than being recreated by the observer.

Use the production build and preview for a realistic view of Vite's generated bundles. The development server serves source modules differently, so request names and sizes will not match the production output.

Browser caching, restored scroll position, and already-loaded shared dependencies can affect what requests you see.

## 11. Safe experiments to learn the behavior

- **Set `rootMargin` to `"0px"`:** loading starts only when the container intersects the viewport. A loading placeholder may be more noticeable.
- **Increase it to `"600px"`:** loading starts earlier, which can hide latency but downloads scenes that visitors might never reach.
- **Change the outer `Suspense` fallback:** customize the JavaScript-loading message independently from the HDR-loading message.
- **Temporarily use a static import for a scene:** compare the production build output and network timing to understand the difference between eager and lazy imports.

Do not expect changing the margin to make the Three.js library itself smaller. To reduce bytes, investigate dependency usage, asset sizes, or a bundle analyzer separately.

## Quick recap

**`import()` splits the code. `React.lazy()` lets React render that asynchronous module. `IntersectionObserver` decides when rendering begins. `Suspense` provides feedback while loading. Reserved dimensions keep the layout stable.**
