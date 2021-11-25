import axios from 'axios';
import { AccountService } from './account.service';

const accSer = new AccountService();
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (body: any) => {
  const picture = body;
  const getSignInfo = {
    type_upload: 'avatar',
    file_name: picture.name,
    file_type: picture.type,
  };
  return await accSer
    .getSignatures(getSignInfo)
    .then((signedRes: any) => {
      return axiosClient
        .put(signedRes.signedRequest, picture)
        .then(() => {
          return signedRes.url;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {});
};
