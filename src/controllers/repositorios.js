const axios = require('axios');

async function getReps() {
  try {
    const response = await axios.get('https://api.github.com/users/takenet/repos?q=&type=public&sort=created&direction=asc&per_page=50');
    if(response && response.data && response.data.length > 0){
        return response.data;
    }
    return null;  
  } catch (error) {
    return null;
  }
}

exports.getRepositorios = async (_req, res) => {
  try {
    const reps = await getReps();
    if(reps){
        let cont = 0;
        const response = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const rep of reps) {
            if(cont < 5){
                if(rep.language && rep.language === "C#"){
                    // eslint-disable-next-line no-plusplus
                    cont++;
                    const aux = {
                        header: {
                            type: "application/vnd.lime.media-link+json",
                            value: {
                                title: rep.name,
                                text: rep.description,
                                type: "image/jpeg",
                                uri: rep.owner.avatar_url
                            }
                        }
                    };
                    response.push(aux);
                } 
            }else{
                break;
            }
        }
        return res.status(200).send({
            itemType: "application/vnd.lime.document-select+json",
            items: response
        });
    }
    return res.status(406).send({msg: 'Nenhum repositório encontrado'});
  } catch (error) {
    return res.status(500).send({msg: 'Serviço indisponível no momento'});
  }
};

