import { getToken } from "../utils/storage";

export const makeGetRequest = async(pathname:string)=>{ 
    const myHeaders = new Headers();
    
    if(getToken()){
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2E0NWIwMWM2MTIyMmY4OGQyNzA0MiIsInJvbGUiOiJhZG1pbiIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2MDcwOTgxMDIsImV4cCI6MTYwNzEwMjA2Mn0.NqlmyqD77b6f5l0Qu3BOwn-LReYv07g4xBzok6G1YsA");
        myHeaders.append("ref-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MDAyYzZjNzViMzFkYjg1ZDQxODAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTU5ODQyNjE4MiwiZXhwIjoxNTk4Njc0NTgyfQ.jCvpFidcdzXziPOMEje98-xgm0B5RXswxMhhLjaoc9w");
    }

    const requestOptions:any = {
        method: "GET",
        headers: myHeaders
    };

    return await fetch(`http://localhost:3000/api${pathname}`, requestOptions)
        .then(response => response.json())
        .then(res => res.data)
        .catch(error => console.log('error', error));
}