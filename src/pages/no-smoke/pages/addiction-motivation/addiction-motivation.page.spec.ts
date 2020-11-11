import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddictionMotivationPage } from './addiction-motivation.page';

describe('AddictionMotivationPage', () => {
  let component: AddictionMotivationPage;
  let fixture: ComponentFixture<AddictionMotivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddictionMotivationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddictionMotivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
