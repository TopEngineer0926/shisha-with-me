import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdSavedPage } from './ad-saved.page';

describe('AdSavedPage', () => {
  let component: AdSavedPage;
  let fixture: ComponentFixture<AdSavedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSavedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdSavedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
