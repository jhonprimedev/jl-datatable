export default function (endpoint, options = {}){
    
    const sendRequest = async() => {
        try{            
            if(Object.keys(options).length === 0){
                options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }            
            const request = await fetch(endpoint, options);
            return await request.json();
        }catch(e){
            throw e;            
        }
    }

    return { sendRequest };
}