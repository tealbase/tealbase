import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TealbaseService } from '../tealbase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly tealbase: TealbaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.tealbase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
