import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Paginated } from '@feathersjs/feathers';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  messages$: Observable<any[]>;
  users$: Observable<any[]>;

  ngOnInit() {
    document.body.classList.remove('bg-img');
  }

  constructor(private data: DataService, private auth: AuthService) {
    // get messages from data service
    this.messages$ = data.messages$().pipe(
        // our data is paginated, so map to .data
        map((m: Paginated<any>) => m.data),
        // reverse the messages array, to have the most recent message at the end
        // necessary because we get a descendingly sorted array from the data service
        map(m => m.reverse()),
      );

    // get users from data service
    this.users$ = data.users$().pipe(
        // our data is paginated, so map to .data
        map((u: Paginated<any>) => u.data)
      );
  }

  sendMessage(message: string) {
    this.data.sendMessage(message);
  }

  logOut() {
    this.auth.logOut();
  }

}
