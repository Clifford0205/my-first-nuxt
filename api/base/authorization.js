import store from '@/store';

export default (headers = {}) => {
  return {
    headers: {
      Authorization: `${store.getters['user/token']}`,
      ...headers
    }
  };
};
