import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdvertisingPage } from './advertising.page';

describe('AdvertisingPage', () => {
  let component: AdvertisingPage;
  let fixture: ComponentFixture<AdvertisingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvertisingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
