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

## 
