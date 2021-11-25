import { SignatureService } from '@app/core/services/signature.service';
import axios from 'axios';

const signatureService = new SignatureService();
class MyUploadAdapter {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    let resSignURL: any;
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
            
          return toBase64(file).then(async () => {
            resSignURL = await signatureService.getSignURL({
              typeUpload: 'content-post',
              fileName: file['name'],
              fileType: file['type'],
            });
            return axios
              .put(resSignURL.signedRequest, file)
              .then((picContent) => {
                if (picContent.status) {
                  this.loader.uploaded = true;
                  resolve({
                    default: resSignURL.url,
                  });
                } else {
                  reject(`Couldn't upload file: ${file['name']}.`);
                }
              });
          });
        })
    );
  }
}

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
