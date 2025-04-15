import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedBtnComponent } from './sharedBtn.component';

describe('SharedBtnComponent', () => {
  let component: SharedBtnComponent;
  let fixture: ComponentFixture<SharedBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
