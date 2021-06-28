const axios = require('axios');

async function getReps() {
  try {
    const response = await axios.get('https://api.github.com/users/takenet/repos?q=&type=&language=c%23&sort=created_at:asc&per_page=5');
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
        const response = reps.map((rep)=>{
            return {
                    header: {
                        type: "application/vnd.lime.media-link+json",
                        value: {
                            title: rep.name,
                            text: rep.description,
                            type: "image/jpeg",
                            uri: rep.owner.avatar_url
                        }
                    }
                }
        });
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

