import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupComponent } from '../../components/popup/popup.component';
import { LoadingComponent } from '../../components/loading/loading.component'; // <-- New Import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PopupComponent,
    LoadingComponent,
  ], // <-- Add LoadingComponent
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // Properties for UI state
  showPopup = false;
  popupMessage = '';
  popupType: 'success' | 'error' = 'success';
  isLoading = false; // <-- New property for loading state

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // <-- Set to true on submission
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading = false; // <-- Set to false on success
          this.showPopupMessage(
            '✅ Login successful! Redirecting...',
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false; // <-- Set to false on error
          console.error('Login failed:', err);
          this.showPopupMessage(
            '❌ Login failed. Please check your credentials.',
            'error'
          );
        },
      });
    } else {
      this.showPopupMessage(
        '❌ Please enter both username and password.',
        'error'
      );
    }
  }

  private showPopupMessage(message: string, type: 'success' | 'error'): void {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 5000);
  }
}
