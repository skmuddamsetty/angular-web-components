import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { tap } from "rxjs/operators";

@Component({
  selector: "user-poll",
  templateUrl: "./user-poll.component.html",
  styleUrls: ["./user-poll.component.css"],
  encapsulation: ViewEncapsulation.Native
})
export class UserPollComponent implements OnInit {
  yes: number;
  no: number;
  hasVoted = false;
  pollRef: AngularFirestoreDocument<any>;
  @Output() open: EventEmitter<any> = new EventEmitter();
  constructor(private afs: AngularFirestore) {
    afs.firestore.settings({ timestampsInSnapshots: true });
  }

  ngOnInit() {
    this.pollRef = this.afs.doc("polls/elements");

    this.pollRef
      .valueChanges()
      .pipe(
        tap(doc => {
          this.yes = doc.yes;
          this.no = doc.no;
        })
      )
      .subscribe();
  }

  vote(val: string) {
    console.log(val);
    this.hasVoted = true;
    this.pollRef.update({ [val]: this[val] + 1 });
    this.open.emit("helloooooooooooo");
  }

  get yesPercent() {
    return (this.yes / (this.yes + this.no)) * 100;
  }

  get noPercent() {
    return (this.no / (this.yes + this.no)) * 100;
  }
}
