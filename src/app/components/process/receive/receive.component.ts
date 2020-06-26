import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPickSenderComponent } from '../../dialogs/dialog-pick-sender/dialog-pick-sender.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GiftViewService } from 'src/app/services/gift-view.service';
import { GiftView } from 'src/app/models/gift_view';
import { DeliverGiftService } from 'src/app/services/deliver-gift.service';
import { DialogDeliverConfirmationComponent } from '../../dialogs/dialog-deliver-confirmation/dialog-deliver-confirmation.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss'],
  animations: [
    trigger('toggleState', [
      state('show',
        style({
          display: 'block',
          opacity: 1
        })
      ),
      state('hide',
        style({
          display: 'none',
          opacity: 0
        })
      )
    ])
  ]
})

export class ReceiveComponent implements OnInit {
  value = '';
  panelOpenState = false;
  isExpanded = false;
  isLoading = false;
  isFoundGift = false;
  isCleared = true;
  isGiftSent = false;
  keypressCount = 0;

  gift: GiftView = {
    transaction: null,
    reference: null,
    value: 0,
    total: 0,
    description: null,
    created_at: null,
    updated_at: null,
    sender_fullname: null,
    receiver_fn: null,
    receiver_ln: null,
    status: null,
    destination: null,
    origin: null,
    is_received: false
  };

get stateNameGift() {
return this.isFoundGift ? 'show' : 'hide';
}

get stateNameNoResult() {
return this.isFoundGift ? 'hide' : 'show';
}

  public searchReferenceForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    searchRef: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-Z0-9]*$')
    ])
  });

  constructor(
    public dialog: MatDialog,
    private giftViewService: GiftViewService,
    private deliverGiftService: DeliverGiftService
  ) {}
  ngOnInit() {}

  public dialogPickSender() {
    this.dialog.open(DialogPickSenderComponent);
  }

  public searchReference() {
    if (this.searchReferenceForm.valid) {
      this.isLoading = true;
      this.isCleared = true;
      // this.isExpanded = false;
      // this.isFoundGift = false;

      setTimeout(() => {
        this.giftViewService
          .get(this.searchReferenceForm.get('searchRef').value)
          // .map((res: Response) => {})
          .subscribe(giftData => {
            if (Object.keys(giftData).length > 0) {
              this.gift = giftData;
              this.isFoundGift = true;
              this.isExpanded = true;
              if (this.gift.status.toLowerCase() === 'sent') {
                this.isGiftSent = true;
              } else {
                this.isGiftSent = false;
              }
            } else if (this.isFoundGift) {
              this.isFoundGift = false;
            }
          });
        this.isLoading = false;
        // this.isCleared = false;
      }, 250);
    }
  }

  public deliver() {
    const dialogRef = this.dialog.open(DialogDeliverConfirmationComponent, {
      // height: '80%',
      width: '40%'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {});

    // this.deliverGiftService.create({gift_id: this.gift.transaction, _key_user: 1, descripcion_estado_gift_id: 2}).subscribe(data => {
    //   console.log('done deliver');
    // });
  }

  public keyPress(ev: any) {
    if (this.searchReferenceForm.get('searchRef').value.length >= 2) {
      this.isCleared = true;
    }
  }
}
