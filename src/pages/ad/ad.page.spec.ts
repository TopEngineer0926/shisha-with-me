import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdPage } from './ad.page';

describe('AdPage', () => {
  let component: AdPage;
  let fixture: ComponentFixture<AdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
