import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactService } from '@portafolio/shared-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, FormsModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm!: FormGroup;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private contactFormService: ContactService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', [Validators.required]],
      companyName: [''],
      reason: ['', [Validators.required]],
      message: [''],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  submit() {
    console.log(this.contactForm.value);

    this.contactFormService.contactService(this.contactForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.contactForm.reset();
        this.openMsgAfterContact('Mensaje enviado con éxito', 'Cerrar');
      },
      error: (error) => {
        console.log(error);
      },
    });

  }

  openMsgAfterContact(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
