# Components

## Gestion de errores

Abstract Class Component

-   método innRender(): => Element | throw error
-   método cleanHTML(): => Element | throw error
-   método render (): => Element | throw error

Class AnyComponent

-   método render() => Element | throw error

Instantiation

```ts
try {
    new Component();
} catch {
    consoleDebug();
}
```
