import api from '../api/axios'


export default async function GetProfile() {
 const response = await api.get('/user/profile')
 return response.data  
}