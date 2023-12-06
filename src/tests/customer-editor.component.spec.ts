import { ComponentFixture, TestBed, flush } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CustomerEditorComponent } from "../app/page/customer-editor/customer-editor.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerService } from "../app/service/customer.service";
import { CustomerServiceMock } from "./mocks/customer.service.mock";

describe("CustomerEditorComponent", () => {
  let component: CustomerEditorComponent;
  let fixture: ComponentFixture<CustomerEditorComponent>;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('id should be 1', () => {
    component.id = 1;
    expect(component.id).toEqual(1);
  });
  
  it('customer should be the first customer in the list', () => {
    component.id = 1;    
    component.ngOnInit();

    setTimeout(() => {
      expect(component.customer()).toBe(component.store.list()[0]);
    });
  });


});
