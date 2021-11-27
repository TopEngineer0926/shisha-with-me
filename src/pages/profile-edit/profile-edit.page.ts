import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraPhoto,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/common/auth/_services/auth.service';
import { HelperService } from 'src/common/services/helper.service';
import { UploadService } from 'src/common/services/upload.service';
import { AddEquipmentPage } from './pages/add-equipment/add-equipment.page';
import { LocationSelectComponent } from './pages/location-select/location-select.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  image: CameraPhoto | any = { webPath: '/assets/mathis.png' };

  user: any = {};

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private http: HttpClient,
    private authService: AuthService,
    public helper: HelperService,
    private loadingCtrl: LoadingController,
    private upload: UploadService,
    private cdr: ChangeDetectorRef,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    await this.loadUser();
  }

  async loadUser() {
    const data = await this.http
      .get('api/users/' + this.authService?.user.id)
      .toPromise();
    this.user = data;
    console.log('this.user', this.user);

    await this.authService.updateUser();
    this.cdr.detectChanges();
  }

  async segmentChanged($event) {
    const update = {
      sessionTime: $event.detail.value,
    };
    const user = await this.http
      .put('api/users/' + this.user.id, update)
      .toPromise();

    await this.loadUser();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async locationEdit() {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: LocationSelectComponent,
      swipeToClose: true,
      presentingElement: elm,
      componentProps: {},
    });
    modal.onDidDismiss().then(async () => {
      await this.loadUser();
    });
    return await modal.present();
  }

  async addShisha() {
    const elm = await this.modalCtrl.getTop();
    const modal = await this.modalCtrl.create({
      component: AddEquipmentPage,
      swipeToClose: true,
      presentingElement: elm,
      componentProps: {},
    });
    modal.onDidDismiss().then(async () => {
      await this.loadUser();
    });
    return await modal.present();
  }

  async change(mode, value) {
    let text, inputType;

    switch (mode) {
      case 'name':
        text = 'Anzeigename';
        inputType = 'text';
        break;
      case 'telegramUsername':
        text = 'Benutzername';
        inputType = 'text';
        break;
      case 'phoneNumber':
        text = 'Telefonnummer';
        inputType = 'tel';
        break;
      case 'username':
        text = 'Benutzername';
        inputType = 'string';
        break;
    }
    const alert = await this.alertController.create({
      header: 'Ändern',
      translucent: true,
      inputs: [
        {
          value,
          name: 'name',
          type: inputType,
          placeholder: text,
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Speichern',
          handler: async (data) => {
            console.log(data);
            let update: any = {};
            if (mode == 'name') {
              update.name = data.name;
            }
            if (mode == 'phoneNumber') {
              update.phoneNumber = data.name;
            }
            if (mode == 'username') {
              update.customUsername = data.name;
            }
            if (mode == 'telegramUsername') {
              update.telegramUsername = data.name;
            }

            try {
              const user: any = await this.http
                .put('api/users/' + this.user.id, update)
                .toPromise();
              await this.loadUser();
            } catch (error) {
              (
                await this.toastCtrl.create({
                  message: 'Benutzername bereits vorhanden',
                  translucent: true,
                  position: 'top',
                  duration: 4000,
                })
              ).present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      quality: 80,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      promptLabelHeader: '',
      promptLabelCancel: 'Abbrechen',
      promptLabelPhoto: 'Foto auswählen',
      promptLabelPicture: 'Foto aufnehmen',
    });

    this.image = image;
    console.log('this.image ', this.image);

    const formData = new FormData();
    console.log('this.user.id', this.user.id);

    /*formData.append('files', {
      uri: image.path,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    formData.append('ref', 'user');
    formData.append('refId', this.user.id);
    formData.append('source', 'users-permissions');
    formData.append('field', 'image');*/

    try {
      const uploaded: any = await this.upload.uploadFile(formData);
      if (!this.user.image) {
        this.user.image = {};
      }
      this.user.image = uploaded.body[0];
      await this.loadUser();
      this.cdr.detectChanges();
      console.log('uploaded', uploaded);
    } catch (error) {
    } finally {
    }
  }

  async changePicture($event: MouseEvent): Promise<void> {
    $event.preventDefault();

    let files: FileList;
    if ($event instanceof DragEvent) {
      if ($event?.dataTransfer?.files?.length > 0) {
        files = $event?.dataTransfer?.files;
      }
    } else {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.multiple = false;
      const fileSelectPromise = new Promise((resolve, reject) => {
        fileInput.onchange = resolve;
      });
      fileInput.click();
      try {
        await fileSelectPromise;
        files = fileInput.files;
      } catch (e) {}
    }

    if (files?.length > 0) {
      const loading = await this.loadingCtrl.create({ translucent: true });
      loading.present();
      for (const file of Array.from(files)) {
        // const uploadData = await this.upload.transfer(file, 'file');
        console.log(file);

        const files = [];
        files.push(file);
        const formData = new FormData();
        console.log('this.user.id', this.user.id);
        formData.append('files', files[0]);
        formData.append('ref', 'user');
        formData.append('refId', this.user.id);
        formData.append('source', 'users-permissions');
        formData.append('field', 'image');

        try {
          const uploaded: any = await this.upload.uploadFile(formData);
          if (!this.user.image) {
            this.user.image = {};
          }
          this.user.image = uploaded.body[0];
          await this.loadUser();
          this.cdr.detectChanges();
          console.log('uploaded', uploaded);
        } catch (error) {
        } finally {
          loading.dismiss();
        }
      }
    }
  }

  async delete(setup) {
    const setups = this.user.setups.filter((_setup) => _setup != setup);

    await this.http.put('api/users/' + this.user.id, { setups }).toPromise();
    this.user.setups = setups;
  }
}
