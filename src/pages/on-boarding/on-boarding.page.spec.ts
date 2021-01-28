import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnBoardingPage } from './on-boarding.page';

describe('OnBoardingPage', () => {
  let component: OnBoardingPage;
  let fixture: ComponentFixture<OnBoardingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnBoardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
