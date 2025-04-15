import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeButtonCounterComponent } from './likeButtonCounter.component';

describe('LikeButtonCounterComponent', () => {
  let component: LikeButtonCounterComponent;
  let fixture: ComponentFixture<LikeButtonCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeButtonCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeButtonCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
