// import { Injectable } from '@angular/core';
// import { ToastController } from '@ionic/angular';

// import { ToastType } from './toast.type';
// export { ToastType } from './toast.type';

// @Injectable({
//     providedIn: 'root'
// })
// export class ToastService {
//     private toastInstance: HTMLIonToastElement;

//     constructor(
//         private toastCtrl: ToastController,
//     ) {
//         console.log("ToastService init.")
//     }

//     public present(type: ToastType, message: string) {
//         console.log('message', message);
//         const msg = message !== 'Unknown Error' ? message : 'Network error, please try again later';
//         const option = Object.assign(DefaultConfig[type], { message: msg });
//         return new Promise(async (resolve, reject) => {
//             this.toastInstance = await this.toastCtrl.create(option);
//             this.toastInstance.onDidDismiss().then(() => {
//                 resolve();
//             });
//             this.toastInstance.present();
//         });
//     }
// }

// const DefaultConfig = {
//     0: {
//         cssClass: "custom-toast-error",
//         duration: 2000,
//         showCloseButton: false,
//         dismissOnPageChange: true,
//         position: "bottom",
//     },
//     1: {
//         cssClass: "custom-toast-success",
//         duration: 2000,
//         showCloseButton: false,
//         dismissOnPageChange: false,
//         position: "middle",
//     },
//     2: {
//         cssClass: "custom-toast-warn",
//         duration: 2000,
//         showCloseButton: false,
//         dismissOnPageChange: false,
//         position: "bottom",
//     }
// }
