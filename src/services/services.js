import axios from 'axios'
const ENDPOINT = process.env.VUE_APP_API_ENDPOINT;
const getCall = () => {
    return axios.get()
}
const postCall = ({ url, data }) => {
    return axios.post(ENDPOINT + url, data)
}
export default {
    getCall,
    postCall
}