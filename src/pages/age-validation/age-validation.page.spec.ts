import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgeValidationPage } from './age-validation.page';

describe('AgeValidationPage', () => {
  let component: AgeValidationPage;
  let fixture: ComponentFixture<AgeValidationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeValidationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgeValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
