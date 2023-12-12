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
  
  it('should have a button to the home page', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toMatch(/go to the home page/i);
  });
  
  it('shuld be trigger the onHomeClick method', () => {
    const button = fixture.nativeElement.querySelector('button');
    spyOn(component, 'onHomeClick');

    button.click();
    fixture.detectChanges();

    expect(component.onHomeClick).toHaveBeenCalled();
  });
});
