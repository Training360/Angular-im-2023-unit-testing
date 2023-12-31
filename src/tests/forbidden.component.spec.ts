import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenComponent } from '../app/page/forbidden/forbidden.component';

describe('ForbiddenComponent', () => {
  let component: ForbiddenComponent;
  let fixture: ComponentFixture<ForbiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a h1', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('Forbidden');
  });

  it('h1 content should be "forbidden"', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toMatch(/forbidden/i);
  });

  it('should have a button to the home page', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('button text should be "go to the home page"', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toMatch(/go to the home page/i);
  });

  it('click on button shuld be trigger the onHomeClick method', () => {
    const button = fixture.nativeElement.querySelector('button');
    spyOn(component, 'onHomeClick');

    button.click();
    expect(component.onHomeClick).toHaveBeenCalled();
  });
  
});
