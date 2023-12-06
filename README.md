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
import { ForbiddenComponent } from '../app/page/forbidden/forbidden.component';
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

##





## JSON-based forms
- command: `ng g c common/form-json`
- [FormJsonComp.](src/app/common/form-json/form-json.component.ts)
- [FormJsonComp. html](src/app/common/form-json/form-json.component.html)
- create: `src/app/form/forms.ts`
- [Forms.ts](src/app/form/forms.ts)
- [CustomersComp: add form-json](src/app/page/customer/customer.component.html)

## Async Validation
- [CustomerService: query](src/app/service/customer.service.ts)
- [CustomerStore: createItem()](src/app/store/CustomerStore.ts)
- command: `ng g c page/customer-add`
- [CustomerAddComp.](src/app/page/customer-add/customer-add.component.ts)
- [CustomersComp: add button, remove country](src/app/page/customer/customer.component.html)
- [AppRoutes: customer/add](src/app/app.routes.ts)

## Multi-field Validation
- [FormJson: expand interface](src/app/common/form-json/form-json.component.ts)
```typescript
export interface IForm {
  name: string;
  fields: IField[];
  validators?: ValidatorFn[];
}
```
- change settings:
```typescript
if (formSettings.validators) {
  this.form.addValidators(formSettings.validators);
}
```
- [FormJson html](src/app/common/form-json/form-json.component.html)
```html
@for (err of form.errors | keyvalue; track $index) {
  <mat-hint>{{ err.value || 'Error' }}</mat-hint>
}
```
- [Forms.ts](src/app/form/forms.ts)
```typescript
name: 'Add new Customer',
validators: [
  (control: AbstractControl) => {
    const value = control.value;
    if (/^10/.test(value['ip_address']) && /\@\w*\..*$/.test(value['email'])) {
      return {emailIpError: 'Corporate emails cannot have a top-level domain.'};
    }
    return null;
  },
],
```

## ControlValueAccessor - Country Selector
- command: `ng g c common/country-selector`
- [CountrySelector edit](src/app/common/country-selector/country-selector.component.ts)
- [FormJson: ComponentHostDirective, IField, loadComponent, html](src/app/common/form-json/form-json.component.ts)
- [Forms.ts: cmpLoader](src/app/form/forms.ts)
