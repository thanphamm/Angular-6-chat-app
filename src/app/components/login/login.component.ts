import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersService } from '../../service/feathers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messages: string[] = [];
  constructor(private feathers: FeathersService, private router: Router) { }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  login(email: string, password: string) {
    this.messages = [];
    if (!email || !password) {
      this.messages.push('Incomplete credentials!');
      return;
    }

    // try to authenticate with feathers
    this.feathers.authenticate({
      strategy: 'local',
      email,
      password
    })
      // navigate to base URL on success
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.messages = [];
        this.messages.unshift('Wrong credentials!');
      });
  }

}
