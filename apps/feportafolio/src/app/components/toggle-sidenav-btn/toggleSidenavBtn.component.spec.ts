import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleSidenavBtnComponent } from './toggleSidenavBtn.component';

describe('ToggleSidenavBtnComponent', () => {
  let component: ToggleSidenavBtnComponent;
  let fixture: ComponentFixture<ToggleSidenavBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleSidenavBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleSidenavBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
