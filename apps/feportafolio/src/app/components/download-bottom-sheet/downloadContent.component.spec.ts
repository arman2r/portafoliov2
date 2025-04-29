import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadContentComponent } from './downloadContent.component';

describe('DownloadContentComponent', () => {
  let component: DownloadContentComponent;
  let fixture: ComponentFixture<DownloadContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
