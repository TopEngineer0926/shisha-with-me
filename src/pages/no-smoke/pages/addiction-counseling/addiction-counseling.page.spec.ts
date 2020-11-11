import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddictionCounselingPage } from './addiction-counseling.page';

describe('AddictionCounselingPage', () => {
  let component: AddictionCounselingPage;
  let fixture: ComponentFixture<AddictionCounselingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddictionCounselingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddictionCounselingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
