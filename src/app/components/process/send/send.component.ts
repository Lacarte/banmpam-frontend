import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/models/gift';
import { MatDialog } from '@angular/material/dialog';
import { DialogPickSenderComponent } from '../../dialogs/dialog-pick-sender/dialog-pick-sender.component';
import { SendGiftService } from 'src/app/services/send-gift.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GiftValue } from 'src/app/models/gift_value';
import { GiftValueService } from 'src/app/services/gift-value.service';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from 'src/app/models/pais';
import { SendGift } from 'src/app/models/send-gift';
import { DocTypeService } from 'src/app/services/doc-type.service';
import { DocType } from 'src/app/models/doc_type';
import { DialogSendConfirmationComponent } from '../../dialogs/dialog-send-confirmation/dialog-send-confirmation.component';
import { isNumber } from 'util';
import { interval } from 'rxjs';
import { IGiftData } from 'src/app/models/Igift-data';
import { compareAsc, format } from 'date-fns';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  [x: string]: any;

  public giftValues: Array<GiftValue>;
  public pais: Array<Pais>;
  public doctypes: Array<DocType>;
  public gift: Array<Gift>;
  // Todo tempory id user
  public idKeyUser = 1;
  public fee = 4.0;
  private source = interval(2000);
  public isLoading = false;
  public giftData: IGiftData = {
    _key: null,
    _key_sender: null,
    _key_receiver: null,
    _key_user: this.idKeyUser,
    transactionNumber: 0,
    ddate: null,
    zone: 'AZ7856 PARIS',
    reference: null,
    senderFirstName: null,
    senderLastName: null,
    senderIdNumber: 0,
    senderDocType: null,
    senderEmail: null,
    senderTel: null,
    receiverFirstName: null,
    receiverLastName: null,
    receiverCountry: null,
    receiverTel: null,
    receiverCodeCountry: null,
    receiverCountryId: 0,
    giftDescription: null,
    giftValue: 0,
    giftValue_id: 0,
    fee: 0,
    total: 0
  };

  public sendGiftForm: FormGroup = new FormGroup({
    id_key: new FormControl(null),
    id_key_sender: new FormControl(null),
    id_key_receiver: new FormControl(null),
    id_key_user: new FormControl(this.idKeyUser),
    senderFirstName: new FormControl('Jean', Validators.required),
    senderLastName: new FormControl('Jean-Louis', Validators.required),
    senderIdNumber: new FormControl('PP313443', Validators.required),
    senderDocType: new FormControl(null),
    senderTel: new FormControl('809-309-9342', [
      Validators.required
      // Validators.minLength(8)
    ]),

    senderEmail: new FormControl(null, Validators.compose([Validators.email])),
    receiverFirstName: new FormControl('Blondedy', Validators.required),
    receiverLastName: new FormControl('Ferdinand', Validators.required),
    receiverCountry: new FormControl(null, Validators.required),
    receiverTel: new FormControl('407-201-4528', Validators.required),
    giftValue: new FormControl(null, Validators.required),
    giftDescription: new FormControl('KADO MARYAJ')
  });

  constructor(
    private dialog: MatDialog,
    private giftValueService: GiftValueService,
    private paisService: PaisService,
    private doctypeService: DocTypeService,
    private sendGiftService: SendGiftService,
    private notificationService: NotificationService,
  ) {
    this.populateGiftValueCMB();
    this.populatePaisCMB();
    this.populateDoctypeCMB();
    this.giftData.fee = 4.0;
    this.giftData.total = this.giftData.fee;
  }

  ngOnInit() {}

  public initializeFormGroup() {
    this.sendGiftForm.setValue({
      id_key: null,
      id_key_sender: null,
      id_key_receiver: null,
      id_key_user: this.idKeyUser,
      senderFirstName: '',
      senderLastName: '',
      senderIdNumber: '',
      senderTel: '',
      DocType: null,
      senderEmailControl: '',
      receiverFirstName: '',
      receiverLastName: '',
      receiverCountry: null,
      receiverTel: '',
      giftValue: null,
      giftDescription: ''
    });
  }

  // Filtrado de Ocupacion
  //   public filterGiftValue(ggvalue: string) {
  //     return this.giftValues2.filter(gvalue =>
  //         gvalue.value.toString().toLowerCase().indexOf(ggvalue.toLowerCase()) === 0);
  // }

  private populateGiftValueCMB() {
    this.giftValueService.getAll().subscribe(data => {
      // console.log(data);
      this.giftValues = data;
    });
  }

  private populatePaisCMB() {
    this.paisService.getAll().subscribe(data => {
      // console.log(data);
      this.pais = data;
    });
  }

  private populateDoctypeCMB() {
    this.doctypeService.getAll().subscribe(data => {
      // console.log(data);
      this.doctypes = data;
    });
  }

  hello() {
    alert('Hello');
  }

  onClear() {
    this.sendGiftForm.reset();
    //  this.sendGiftService.initializeFormGroup();
    //  this.sendGiftService.sendGiftForm.markAsUntouched();
    //  this.sendGiftService.sendGiftForm.markAsPristine();
  }

  onSubmit() {
    if (this.sendGiftForm.valid) {
      // this.giftData.transNumber = 0;
      // this.giftData.ddate = null;
      // this.giftData.zone = null;
      this.giftData.senderFirstName = this.sendGiftForm.get(
        'senderFirstName'
      ).value;
      this.giftData.senderLastName = this.sendGiftForm.get(
        'senderLastName'
      ).value;
      this.giftData.senderTel = this.sendGiftForm.get('senderTel').value;

      this.giftData.receiverFirstName = this.sendGiftForm.get(
        'receiverFirstName'
      ).value;
      this.giftData.receiverLastName = this.sendGiftForm.get(
        'receiverLastName'
      ).value;

      this.giftData.receiverTel = this.sendGiftForm.get(
        'receiverTel'
      ).value;
      this.giftData.receiverCodeCountry = this.sendGiftForm.get(
        'receiverCountry'
      ).value.codigo;

      this.giftData.receiverCountryId = this.sendGiftForm.get(
        'receiverCountry'
      ).value.id;

      this.giftData.receiverCountry = this.sendGiftForm.get(
        'receiverCountry'
      ).value.nombre;

      this.giftData.giftDescription = this.sendGiftForm.get(
        'giftDescription'
      ).value;

      this.giftData.giftValue_id = this.sendGiftForm.get(
        'giftValue'
      ).value.id;

      console.log('sending...');
      // this.sendGiftService.sendGiftForm.markAsTouched();


      // this.notificationService.success('Transaction made successfully.');
      this.isLoading = !this.isLoading;

      setTimeout(() => {
        // this.sendGiftService.create(new SendGift(this.sendGiftForm.value)).subscribe((data) => {
        this.sendGiftService
          .create(new SendGift(this.giftData))
          .subscribe((data: IGiftData) => {
            console.log(data);
            // data.ddate
            console.log(data.ddate);
            // console.log(format(new Date(data.ddate), 'MM/dd/yyyy hh:mm:ss'));
            data.ddate = format(new Date(data.ddate), 'MMM do, yyyy');
            this.isLoading = !this.isLoading;

            // data.ddate="dsdsds";
            const dialogRef = this.dialog.open(DialogSendConfirmationComponent, {
              // height: '40%',
              width: '50%',
              data
            });

            dialogRef.afterClosed().subscribe((confirmed: boolean) => {
              // this.sendGiftService.senders =  [];
              // this.sendGiftService.senderPeople = [];
              // this.sendGiftService.isSenderExist = false;
              this.onClear();
            });
          });
      }, 300);
    }
  }

  dialogPickSender() {
    const dialogRef = this.dialog.open(DialogPickSenderComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      // this.sendGiftService.senders =  [];
      // this.sendGiftService.senderPeople = [];
      // this.sendGiftService.isSenderExist = false;
    });
  }



  addPrice(valA: any, valB: any) {
    if (!valA) {
      return this.fee;
    } else {
      const result = parseFloat(valA) + parseFloat(valB);
      if (!isNumber(result)) {
        return 0.0;
      }
      return result.toFixed(2);
    }
  }

  setGiftData(event: any) {
    if (this.sendGiftForm.get('giftValue').valid) {
      this.giftData.giftValue = this.sendGiftForm.get('giftValue').value.value;
      this.giftData.fee = this.fee;
      this.giftData.total = +this.addPrice(this.giftData.giftValue, this.fee);
    }
  }
}
