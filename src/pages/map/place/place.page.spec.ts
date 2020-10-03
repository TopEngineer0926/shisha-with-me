import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlacePage } from './place.page';

describe('PlacePage', () => {
  let component: PlacePage;
  let fixture: ComponentFixture<PlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
