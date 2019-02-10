import axios from 'axios';
const makeRequest = url => axios.get(url, {responseType: "json"})
const service = {
  getPhotos(){
     const url = "/photos"
     return makeRequest(url)
  }
}


export default service;
