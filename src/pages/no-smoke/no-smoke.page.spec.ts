import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoSmokePage } from './no-smoke.page';

describe('NoSmokePage', () => {
  let component: NoSmokePage;
  let fixture: ComponentFixture<NoSmokePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSmokePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoSmokePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
