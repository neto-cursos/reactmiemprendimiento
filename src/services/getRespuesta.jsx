import ApiAuth from "../Authentication/ApiAuth";

const ENDPOINT='/misrespuestas';

export const getRespuestas =(modulo,userid)=>{
    //const apiUrl=getApiUrl(`movie/${userid}`);
    return ApiAuth().post(ENDPOINT, {modu_nume:modulo}).then(response => {
        console.log("Respuesta ApiAuth():");
        console.log(response);
        return response.data
    })
}
/*
export default function getRespuesta ({ token }) {
    return fetch(`${ENDPOINT}/favs`, {
      method: 'GET',
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) throw new Error('Response is NOT ok')
      return res.json()
    }).then(res => {
      const { favs } = res
      return favs
    })
  }*/

