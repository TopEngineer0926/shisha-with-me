import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddictionInformationPage } from './addiction-information.page';

describe('AddictionInformationPage', () => {
  let component: AddictionInformationPage;
  let fixture: ComponentFixture<AddictionInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddictionInformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddictionInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
