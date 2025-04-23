import { Directive, ElementRef, AfterViewInit, OnDestroy, Input, Renderer2, NgZone } from '@angular/core';
import { AnimationBuilder, AnimationFactory, AnimationPlayer, style, animate } from '@angular/animations';

@Directive({
  selector: '[appScrollAnimation]', // Use as an attribute: <section appScrollAnimation>
  standalone: true,
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private animationFactory: AnimationFactory;
  private player: AnimationPlayer | null = null; // Player instance

  // Input for animation duration
  @Input('appScrollAnimationDuration') duration: string = '600ms';

  // Input for starting Y position (element appears from this many pixels below its final position)
  @Input('appScrollAnimationFromY') fromY: string = '50px';

  // Input for intersection threshold (percentage of element visible to trigger)
  @Input('appScrollAnimationThreshold') threshold: number = 0.1; // 10% visible

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
    private ngZone: NgZone // Inject NgZone for performance optimization
  ) {
     // Build the animation factory once in the constructor
     // This defines the 'animate in' sequence from the hidden/offset state to the visible state
     this.animationFactory = this.animationBuilder.build([
        style({ opacity: 0, transform: `translateY(${this.fromY})` }), // The STARTING styles for the animation
        animate(`${this.duration} ease-out`, style({ opacity: 1, transform: 'translateY(0)' })) // The ENDING styles for the animation
     ]);
  }

  ngAfterViewInit(): void {
    // Set the initial state immediately after the view is initialized
    // The element starts hidden and offset
    this.resetState();

    // Set up the Intersection Observer outside Angular's zone for performance
    // This prevents unnecessary change detection cycles during scrolling
    this.ngZone.runOutsideAngular(() => {
       this.observer = new IntersectionObserver(
         (entries) => {
           entries.forEach((entry) => {
             // Run back inside Angular's zone to trigger animation or state reset
             this.ngZone.run(() => {
                 if (entry.isIntersecting) {
                   // Element entered the viewport - play the animation
                   this.animateIn();
                 } else {
                    // Element left the viewport - reset its state to hidden/offset
                    this.resetState();
                 }
             });
           });
         },
         { threshold: this.threshold } // Use the threshold input
       );

       // Start observing the host element
       this.observer.observe(this.el.nativeElement);
    });
  }

  /**
   * Plays the 'animate in' sequence.
   */
  private animateIn(): void {
     // Stop any existing animation player to prevent conflicts
     if (this.player) {
        this.player.destroy();
     }

     // Create and play the animation
     // The animation starts from the current state (which should be the reset state: opacity 0, translateY)
     this.player = this.animationFactory.create(this.el.nativeElement);
     this.player.play();

  }

  /**
   * Resets the element's style to the initial hidden/offset state instantly.
   */
  private resetState(): void {
     // Stop any ongoing animation before resetting
     if (this.player) {
         this.player.destroy();
         this.player = null;
     }

     // Disable transitions temporarily to make the reset instantaneous
     this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');

     // Apply the initial styles
     this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
     this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${this.fromY})`);

     this.renderer.setStyle(this.el.nativeElement, 'transition', null);
  }


  ngOnDestroy(): void {
    // Disconnect the observer when the directive/element is destroyed
    if (this.observer) {
      this.observer.disconnect();
    }
     // Destroy the animation player
     if (this.player) {
        this.player.destroy();
        this.player = null;
     }
  }
}