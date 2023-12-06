# Angular Unit Testing

## Start

- `npm run dev`

## Intro

- [tsconfig.spec.json: explain](tsconfig.spec.json)
- command: `ng test`

## Smart and dump components

- [ForbiddenComp: a dumb example](src/app/page/forbidden/forbidden.component.ts)
- [ForbiddenSpec: moved to](src/tests/forbidden.component.spec.ts)
- change the component path:

```typescript
import { ForbiddenComponent } from "../app/page/forbidden/forbidden.component";
```

- [package.json](package.json)
- create/modify test scripts:

```json
"test:01": "ng test --include=**/tests/forbidden.component.spec.ts",
"test": "ng test --include=**/tests/*.spec.ts --browsers ChromeHeadless --watch false",
```

- commands:
- `npm run test:01`
- `npm test`

## HTML elements

- [ForbiddenSpec](src/tests/forbidden.component.spec.ts)
- testing h1:

```typescript
it("should have a h1", () => {
  const h1 = fixture.nativeElement.querySelector("h1");
  expect(h1).toBeTruthy();
  expect(h1.textContent).toContain("Forbidden");
});

it('h1 content should be "forbidden"', () => {
  const h1 = fixture.nativeElement.querySelector("h1");
  expect(h1.textContent).toMatch(/forbidden/i);
});
```

- command: `npm test`

## Testing a method call

- [ForbiddenComp](src/app/page/forbidden/forbidden.component.ts)

```typescript
onHomeClick() {
  console.log('home');
  }
```

- [ForbiddenComp html](src/app/page/forbidden/forbidden.component.html)

```html
<h2 style="text-align: center; margin-top: 1em;">
  <button (click)="onHomeClick()">Go to the home page</button>
</h2>
```

- [ForbiddenSpec](src/tests/forbidden.component.spec.ts)

```typescript
it("should have a button to the home page", () => {
  const button = fixture.nativeElement.querySelector("button");
  expect(button).toBeTruthy();
});

it('button text should be "go to the home page"', () => {
  const button = fixture.nativeElement.querySelector("button");
  expect(button.textContent).toMatch(/go to the home page/i);
});

it("click on button shuld be trigger the onHomeClick method", () => {
  const button = fixture.nativeElement.querySelector("button");
  spyOn(component, "onHomeClick");

  button.click();
  expect(component.onHomeClick).toHaveBeenCalled();
});
```

## Testing and Dependency Injection

- [CustomerEditor: copy to](src/tests/customer-editor.component.spec.ts)
- fix component path:
- `import { CustomerEditorComponent } from '../app/page/customer-editor/customer-editor.component';`
- add imports:

```typescript
HttpClientTestingModule,
BrowserAnimationsModule,
```

- mock CustomerService:
- [CustomerServiceMock: create](src/tests/mocks/customer.service.mock.ts)
- set providers:
- [CustomerEditor: edit](src/tests/customer-editor.component.spec.ts)

```typescript
providers: [
  {
    provide: CustomerService,
    useClass: CustomerServiceMock,
  },
],
```

```typescript
it("customer should be the first customer in the list", () => {
  component.id = 1;
  component.ngOnInit();

  setTimeout(() => {
    expect(component.customer()).toBe(component.store.list()[0]);
  });
});
```


