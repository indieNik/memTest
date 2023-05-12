import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaky',
  template: `
    <button>Click me</button>
  `,
})
export class LeakyComponent implements OnInit, OnDestroy {
  private leakyArray: any[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createMemoryLeak();
  }

  ngOnDestroy(): void {
    // Uncomment the line below to remove the event listener and fix the memory leak
    // this.button.removeEventListener('click', this.handleClick);
  }

  createMemoryLeak(): void {
    setInterval(() => {
      this.leakyArray.push(new Array(1000000).join('x'));
    }, 100);
  }
}
