import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiAuth from "../Authentication/ApiAuth";

const POSTS_URL = '/misemprendimientos';
/*
export const getEmprendimientos =(datoid)=>{
    //const apiUrl=getApiUrl(`movie/${userid}`);
     ApiAuth().post(ENDPOINT, {id:datoid}).then(response => {
        console.log("HOLIS");
        console.log(response);
        return response.data
    }).catch(Error=>{
        console.log("error getEmprendimientos:")
        console.log(Error)
        return null;
    })
}*/
export const getEmprendimientos = (datoid) => {
    createAsyncThunk('emprs/fetchEmprs', async (datoid) => {
        const response = await ApiAuth().post(POSTS_URL, { id: datoid }).then(response => {
            console.log("HOLIS");
            console.log(response);
            return response.data
        }).catch(Error => {
            console.log(Error)
            return null;
        })
        return response;
        /*return await getEmprendimientos(datoid)*/
    })
}