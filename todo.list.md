# Lista de tareas

## Modelo de datos

Los modelos de datos se definen como tipos (type, preferiblemente a interface, que se reserva para conjuntos de métodos que debe implementar una clase) o como clases

En el primer caso, nuestro tipo sería:

```ts
type TaskType = {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
};
```

En caso de usar una clase, implementaríamos el tipo anterior y podríamos incluir un método estático de la clase que proporcionara los IDs. Igualmente inicializaríamos siempre en false la propiedad isCompleted de las tareas

@TODO: sustituir el formato de creación de IDs por otro más seguro

```ts
export class Task implements TaskType {
    static generateId() {
        return String(~~(Math.random() * 1_000_000).toPrecision(6));
    }
    id: string;
    isCompleted: boolean;
    constructor(public title: string, public responsible: string) {
        this.id = Task.generateId();
        this.isCompleted = false;
    }
}
```

## Mock de datos

Para disponer inicialmente de algunas tareas, creamos un mock de ellas.

```ts
import { Task } from '../models/task.js';

export const TASKS = [
    new Task('Hacer algo', 'Pepe'),
    new Task('Hacer otra cosa', 'Ernesto'),
    new Task('No hacer nada', 'Elvira'),
].map((item) => ({ ...item }));

export const initializeTasks = () => TASKS;
```

Al disponer de una función que devuelve los datos podríamos hacerla asíncrona, para mocear de forma más realista la llegada de datos de alguna fuente externa (e.g. API).

Por esta misma razón los objetos Task se desestructuran y reconstruyen para que sean objetos literales, como los que llegarían de una fuente externa.

## Componentes

Tanto las paginas como los elementos definidos en ellas son componentes basados en clases que extienden una clase "padre" **Component**

En ella se declaran como métodos protegidos diversas formas de renderización, junto con un método público **render**
Igualmente existe una propiedad protegida "template"

```ts
export abstract class Component {
    protected template!: string;
    private element!: Element;
    render() {
        return;
    }
    protected innRender(selector: string) {}
    protected addRender(selector: string) {}
    protected outRender(selector: string) {}
}
```

Las clases "hijas" sobrescriben el render, utilizando alguna de las implementaciones protegidas en el padre

Igualmente sobrescriben la propiedad **template**, con su propio template en cada caso y declaran una propiedad privada **selector** que toma valor a partir del argumento recibido en el constructor

```ts
import { Component } from '../component/component.js';

export class Sample extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
    }
    render() {
        super.innRender(this.selector);
    }
    private createTemplate() {
        return ``;
    }
}
```

## Página HTML

Añadimos una nueva página, que se cargará desde el componente app

### Enrutamiento

```ts
export class App {
    menuOptions: MenuOptionsType;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            { path: './todo.html', label: 'Task' },
            { path: './about.html', label: 'About' },
        ];
    }

    router () {
        const path = './' + location.pathname.split('/').at(-1);
        switch (path) {
            case this.menuOptions[1].path:
                new TodoPage('.root');
                break;
            case ...
        }
    }
}
```

@TODO: sustituir por un diccionario

### Página html

Reproduce el comportamiento de las otras páginas

-   se renderiza añadiéndose en el selector proporcionado
-   utiliza en template muy simple que añade - la etiqueta main - el título de la página - un slot para los componentes de la página
-   instancia el/los componentes de la página proporcionándoles el slot como selector

```ts
import { Component } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';

export class TodoPage extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        new List('.todo-wrapper');
    }

    render() {
        super.addRender(this.selector);
    }

    createTemplate() {
        return `
        <main>
            <h2>Tareas</h2>
            <div class="todo-wrapper"></div>
        </main>
        `;
    }
}
```

### Testing

El test del componente página, como todos los test de componentes, utiliza

-   '@testing-library/dom', que simula el DOM y proporciona el objeto screen para acceder a él;
-   '@testing-library/jest-dom, que añade a Jest aserciones específicas para el DOM, como toHaveTextContent

```ts
import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { TodoPage } from './todo';
```

En los test más básico

-   se recogen los elementos de la página "renderizada" en screen, utilizando las queries proporcionadas en la testing-library
-   se comprueba que estos elementos han sido en efecto renderizados

```ts
describe('Given "TodoPage" component', () => {
    document.body.innerHTML = `<slot name="page"></slot>`;
    new TodoPage('slot[name="page"]');
    const elements = [
        screen.getByRole('heading', { name: 'Tareas' }), // <h2>
    ];
    describe.each(elements)(
        'When it is call with a DOM implementation',
        (element: HTMLElement) => {
            test(`Then ${element.tagName} should be render`, () => {
                expect(element).toBeInstanceOf(HTMLElement);
                expect(element).toBeInTheDocument();
            });
        }
    );
});
```

## Componentes en la lista de tareas

Patrón controlador/presentadores:

El controlador (componente List): - tiene el estado (conjunto de datos) - tiene los métodos que gestionan los cambios de estado - renderiza los presentadores

Los presentadores (componentes Item y Add): - tienen los detalles de interface específicos de cada caso - incluyen la lógica de interface (formularios, botones...) - reciben desde el presentador los datos que necesitan y los métodos de gestión del estado - ejecutan estos métodos en respuesta a su lógica interna com UIs

## Componente List

### UI

Se limita a proporcionar - un título - un contenedor de la lista (ul) - los slots necesarios para los otros componentes

```ts
    createTemplate() {
        return `
        <section>
            <slot name="add"></slot>
            <h3>Lita de tareas</h3>
            <ul class="slot-items"></ul>
        </section>
        `;
    }
```

### Estado y métodos para su gestión

El componente Lista define el estado de esta parte de la aplicación: la propiedad **tasks**, al tiempo que recoge como valor inicial el array de tareas proporcionado por el mock

```ts
    constructor(private selector: string) {
        ...
        this.tasks = initializeTasks();
        this.manageComponent();
    }
```

Las operaciones relativas al template y su renderización se encapsulan en un método, que es ejecutado desde el constructor, pero queda disponible para ser usado posteriormente, siempre que haya un cambio de estado

```ts
    manageComponent() {
        consoleDebug(this.tasks);
        this.template = this.createTemplate();
        this.render();
        new Add('slot[name="add"]', this.addTask.bind(this));
        this.tasks.forEach(
            (item) =>
                new Item(
                    'ul.slot-items',
                    item,
                    this.updateTask.bind(this),
                    this.deleteTask.bind(this)
                )
        );
    }
```

Se definen los métodos que gestionan en estado (CRUD del array):

    -   create
    -   update
    -   delete

En los tres casos operaciones estándar sobre arrays seguidas de la actualización completa del tempate y su nueva renderización, empleándose para ello el método antes descrito

```ts
    addTask(task: Task) {
        this.tasks = [...this.tasks, task];
        this.manageComponent();
    }
    updateTask(id: string, data: Partial<Task>) {
        this.tasks = this.tasks.map((item) =>
            item.id === id ? { ...item, ...data } : item
        );
        this.manageComponent();
    }
    deleteTask(id: string) {
        this.tasks = this.tasks.filter((item) => item.id !== id);
        this.manageComponent();
    }
```

### Testing del componente List

Además de testear su UI, comprobando que renderiza el título, se podrían testear directamente las funciones que gestionan el estado

## Componente Add

### UI

El template del componente incluye el formulario que permite registrar nuevas tareas: dos campos de texto junto con un botón submit

```ts
    createTemplate() {
        return `
        <section>
            <h3>Añadir tarea</h3>
            <form class="add">
                <div>
                    <label for="title">Tarea</label>
                    <input type="text" name="title" id="title" placeholder="Describe la tarea" required>
                </div>
                <div>
                    <label for="responsible">Responsable</label>
                    <input type="text" name="responsible" id="responsible" placeholder="Responsable de la tarea">
                </div>
                <div>
                    <button type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
    }
```

El método de renderización sobrescribe el método de la clase padre, para completar el proceso asignado un manejador (handler) al evento submit del formulario

```ts
    render(): void {
        super.outRender(this.selector);
        setTimeout(() => {
            document
                .querySelector('form.add')
                ?.addEventListener('submit', this.handleForm.bind(this));
        }, 100);
    }
```

En la definición del manejador, al pasarle a addEventListener un método como callback, es importante hacer bind del valor de this en el **lexical scope**

### Lógica del UI

El manejador del evento submit del formulario tiene el formato habitual de este tipo de funciones:

-   event.preventDefault evita el comportamiento por defecto de los formularios HTML al dispararse un evento submit
-   se define una variable para recoger los valores del formulario
-   se recorren los elemento del formulario recogiendo dichos valores

Al final

-   se crea una instancia de Tarea con los datos proporcionados con el usuario
-   se utiliza el método de gestión del estado recibido desde el componente controlador.
    Ese método esta ligado por **bind** a dicho componente, por lo que tiene acceso al estado y puede modificarlo.

```ts
    handleForm(event: Event) {
        const dataForm: DataFormType = {
            title: '',
            responsible: '',
        };

        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const inputs = [
            ...formElement.querySelectorAll('[type="text"]'),
        ];
        [dataForm.title, dataForm.responsible] = [...inputs].map(
            (item) => (item as HTMLFormElement).value
        );
        const newTask = new Task(dataForm.title, dataForm.responsible)
        this.handleAdd({...newTask});
    }
```

### Testing del componente Add

Además de testear su UI, comprobando que renderiza el título, se podrían testear directamente las funciones que gestionan el comportamiento de la UI, como el manejador del evento submit

## Componente Item

### UI

El template del componente incluye como item de una lista una serie de spans que recogen toda la información de los items. El item completo se identifica con un id de HTML que se genera en base al id de la propia tarea

```ts
    createTemplate() {
        return `
        <li class="item-task" id="item_${this.item.id}">
            <span class="item-task__start">
                <input type="checkbox" ${this.item.isCompleted && 'checked'}>
                <span>${this.item.id}</span>
            </span>
            <span class="item-task__middle">
                <span>${this.item.title}</span>
                <span>${this.item.responsible}</span>
            </span>
            <span role="button" class="item-task__end button">
                🗑️
            </span>
        </li>
        `;
    }
```

En el caso del checkbox, se utiliza la propiedad nativa de HTML checked, que se aplica o no en función del valor de la correspondiente propiedad del item

El método de renderización sobrescribe el método de la clase padre, para completar el proceso asignado un manejador (handler) a los eventos change del checkbox y click del botón delete

```ts
    render() {
        super.addRender(this.selector);
        setTimeout(() => {
            const component = <HTMLElement>(
                document.querySelector(`#item_${this.item.id}`)
            );
            component
                .querySelector('[type="checkbox"]')
                ?.addEventListener('change', this.handleCheck.bind(this));
            component
                .querySelector('[role="button"]')
                ?.addEventListener('click', this.handleButton.bind(this));
        }, 100);
    }

```

### Lógica del UI

Al ser instanciado, el componente recibe como argumentos

-   el selector donde se renderizará
-   el item con los datos para completar el template
-   los métodos que permitirán actualizar el estado en el componente que lo instancia (controlador, padre)

Estos métodos serán ejecutados en los manejadores de eventos del propio componente, en respuesta a las interacciones del usuario

```ts
   handleCheck() {
        const result: Partial<Task> = {
            id: this.item.id,
            isCompleted: !this.item.isCompleted,
        };
        console.log('checked', result);
        this.updateTask(this.item.id, result);
    }

    handleButton() {
        console.log('deleted');
        this.deleteTask(this.item.id);
    }
```

### Testing del componente Item
