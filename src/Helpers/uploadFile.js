
export const loadNewFiles = async (file) => {
    const Coultrlyn = 'https://api.cloudinary.com/v1_1/apimedia/image/upload';

    // se crea un body para la peticion
     const fromData = new FormData( );
     fromData.append('upload_preset', 'react-app-homewors');
     fromData.append('file', file );
     
     try {
         //ASI SE HACEN LOS POST FECT
        const resp = await fetch(Coultrlyn , {
            method:'POST',
            body:fromData,
        });

        if(resp.ok){
            const  cloudResp = await resp.json();
            return  cloudResp.secure_url;
         }else{
            throw await resp.json();
        }

     } catch (error) {
         throw error;
     }
}


