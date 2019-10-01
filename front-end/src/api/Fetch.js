
const fetching = async (api,method,body)=>{
    if(body&&method){
        const req = await fetch(api,{
            method:method,
            headers:{
            "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        const res = await req.json();
        return res;
    }
    else{
        const req = await fetch(api);
        const res = await req.json();
        return res;
    }
}

export default fetching;