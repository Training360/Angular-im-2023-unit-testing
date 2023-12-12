import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MatInputHarness } from "@angular/material/input/testing";
import { MatFormFieldHarness } from "@angular/material/form-field/testing";
import { MatButtonHarness } from "@angular/material/button/testing";

import { CustomerEditorComponent } from '../app/page/customer-editor/customer-editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from '../app/service/customer.service';
import { CustomerServiceMock } from './mocks/customer.service.mock';

describe('CustomerEditorComponent', () => {
  let component: CustomerEditorComponent;
  let fixture: ComponentFixture<CustomerEditorComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerEditorComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: CustomerService,
          useClass: CustomerServiceMock,
        },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerEditorComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('id should be 1', () => {
    component.id = 1;
    expect(component.id).toEqual(1);
  });

  it('customer sould be te first customer in the list', (done) => {
    component.id = 1;
    component.ngOnInit();

    setTimeout(() => {
      expect(component.customer()).toBe(component.store.list()[0]);
      done();
    });
  });

  it('the form should hav a name field', (done) => {
    component.id = 1;
    component.ngOnInit();

    setTimeout(() => {
      const input = fixture.debugElement.nativeElement.querySelector(
        'input[formControlName="name"]'
      );

      expect(input).toBeTruthy();
      done();
    });
  });
  
  it('the name field shuld have the correct value', async () => {
    component.id = 1;
    component.ngOnInit();
    const nameInputHarness = await loader.getHarness<MatInputHarness>(
      MatInputHarness.with({ selector: 'input[formControlName="name"]' })
    );

    await fixture.whenStable();

    const name = await nameInputHarness.getValue();
    expect(name).toBe('Poul Brinkworth');
  });
  
  it('the name field shuld have an error if the value is too short', async () => {
    component.id = 1;
    component.ngOnInit();
    const nameInputHarness = await loader.getHarness<MatInputHarness>(
      MatInputHarness.with({ selector: 'input[formControlName="name"]' })
    );

    await nameInputHarness.setValue('Dr');
    fixture.detectChanges();
    await fixture.whenStable();

    const errorHint = fixture.nativeElement.querySelector(
      'form mat-form-field:first-child mat-hint'
    );

    expect(errorHint).toBeTruthy();

    await nameInputHarness.setValue('Drake');
    fixture.detectChanges();
    await fixture.whenStable();

    const errorHint2 = fixture.nativeElement.querySelector(
      'form mat-form-field:first-child mat-hint'
    );

    expect(errorHint2).toBeFalsy();
  });
  
  it('save button should call the onUpdate method', async () => {
    component.id = 1;
    component.ngOnInit();
    
    const spy = spyOn(component, 'onUpdate');

    const saveButtonHarness = await loader.getHarness<MatButtonHarness>(
      MatButtonHarness.with({ selector: 'button[type="submit"]' })
    );

    await saveButtonHarness.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledOnceWith(component.form);
  });

});
