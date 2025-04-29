import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadBtnComponent } from './downloadBtn.component';

describe('DownloadBtnComponent', () => {
  let component: DownloadBtnComponent;
  let fixture: ComponentFixture<DownloadBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
