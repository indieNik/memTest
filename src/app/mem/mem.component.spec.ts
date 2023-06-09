import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemComponent } from './mem.component';

describe('MemComponent', () => {
  let component: MemComponent;
  let fixture: ComponentFixture<MemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(async () => {
    if (performance) {
      const windowPerformance: any = performance;
      let memory: any = windowPerformance.memory;
      if (memory) {
        console.log(`usedJSHeapSize: ${memory.usedJSHeapSize / Math.pow(1000, 2)} MB`);
      }
    }
  });
});
