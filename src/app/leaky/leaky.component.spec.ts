import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LeakyComponent } from './leaky.component';

describe('LeakyComponent', () => {
  let component: LeakyComponent;
  let fixture: ComponentFixture<LeakyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeakyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeakyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail due to memory leak', waitForAsync(() => {
    let initialMemoryUsage: number;

    function getMemoryUsage(): number {
      return (window.performance as any).memory.usedJSHeapSize;
    }

    initialMemoryUsage = getMemoryUsage();

    setTimeout(() => {
      const currentMemoryUsage = getMemoryUsage();
      const memoryLeak = (currentMemoryUsage - initialMemoryUsage) / Math.pow(1000, 2);
      const memoryLeakThreshold = 0.1; // in MB
      expect(memoryLeak).toBeLessThanOrEqual(memoryLeakThreshold);
    }, 2000); // Wait for 2 seconds before checking for memory leak
  }));
});
