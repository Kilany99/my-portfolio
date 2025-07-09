import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollAnimationDirective } from '../../shared/scroll-animation.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ScrollAnimationDirective,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [ 
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate('1500ms ease-out')
      ])
    ])
  ]
})
export class ContactComponent {
  isSubmitting = false;
  isSuccess = false;
  touched = { name: false, email: false, message: false };

  markTouched(field: 'name' | 'email' | 'message') {
    this.touched[field] = true;
  }

  async onSubmit(form: NgForm) {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.isSuccess = false;
    // Simulate waiting
    await new Promise(res => setTimeout(res, 1800));
    this.isSubmitting = false;
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
      form.resetForm();
      this.touched = { name: false, email: false, message: false };
    }, 3000);
  }
}
