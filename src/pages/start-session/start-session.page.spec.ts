import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartSessionPage } from './start-session.page';

describe('StartSessionPage', () => {
  let component: StartSessionPage;
  let fixture: ComponentFixture<StartSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSessionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
