import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BottomSheetOverviewSharedComponent } from './bottom-sheet-overview-shared.component';

describe('BottomSheetOverviewSharedComponent', () => {
  let component: BottomSheetOverviewSharedComponent;
  let fixture: ComponentFixture<BottomSheetOverviewSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetOverviewSharedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
