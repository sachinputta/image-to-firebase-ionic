//
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor( private fdb: AngularFireDatabase, public storage: AngularFireStorage, private camera: Camera, ) {
    // tslint:disable-next-line: variable-name
    // this.fdb.list('/myItems/').valueChanges().subscribe( data => {
      // this.arrData = data;
      // console.log(this.arrData);
    // });
  }
  filePath: any;
  imgsrc: any;
  task: AngularFireUploadTask;

  public downloadUrl: Observable<string>;

  progress: any;  // Observable 0 to 100

  image: string; // base64
  storageRef: any;

// tslint:d isable-next-line: member-ordering
arrData = [];
myInput;



  ngOnInit() {}

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    return await this.camera.getPicture(options);
}
createUploadTask(file: string): void {

  this.filePath = `${ new Date().getTime() }.jpg`;
  console.log(this.filePath);
  this.image = 'data:image/jpg;base64,' + file;
  this.task = this.storage.ref(this.filePath).putString(this.image, 'data_url');

  this.progress = this.task.percentageChanges();
  this.task.percentageChanges().subscribe(res => {
      if ( res === 100) {
        setTimeout(() => {
          // tslint:disable-next-line: max-line-length
          this.imgsrc = 'https://firebasestorage.googleapis.com/v0/b/fir-storage-ionic-4bbb2.appspot.com/o/'  + this.filePath +  '?alt=media&';

        }, 6000);
         }
    });
  console.log('https://firebasestorage.googleapis.com/v0/b/fir-storage-ionic-4bbb2.appspot.com/o/' + this.filePath + '?alt=media&');


}

async uploadHandler() {
 const base64 = await this.captureImage();
 this.createUploadTask(base64);
}





}
