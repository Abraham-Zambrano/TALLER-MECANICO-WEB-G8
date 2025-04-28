import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePrincipalComponent } from './home-principal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs'; 
import { AuthService } from '../.././auth.service';

describe('HomePrincipalComponent', () => {
  let component: HomePrincipalComponent;
  let fixture: ComponentFixture<HomePrincipalComponent>;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      currentUser$: of({ name: 'Test User' })
    };

    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        RouterTestingModule,
        HomePrincipalComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message', () => {
    const welcomeMessage = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(welcomeMessage.textContent).toContain('Bienvenido');
  });

  it('should render module cards', () => {
    const moduleCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(moduleCards.length).toBeGreaterThan(0);
  });

  it('should navigate when clicking a module card', () => {
    spyOn(component, 'navigateTo');
    const firstCard = fixture.debugElement.query(By.css('mat-card'));
    firstCard.triggerEventHandler('click', null);
    expect(component.navigateTo).toHaveBeenCalled();
  });

  it('should show user name if logged in', () => {
    fixture.detectChanges();
    const userName = fixture.debugElement.query(By.css('.user-name')).nativeElement;
    expect(userName.textContent).toContain('Test User');
  });
});
