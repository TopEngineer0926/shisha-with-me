import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageSharePage } from './image-share.page';

describe('ImageSharePage', () => {
  let component: ImageSharePage;
  let fixture: ComponentFixture<ImageSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
