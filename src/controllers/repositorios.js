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
                image: rep.owner.avatar_url,
                title: rep.name,
                desc: rep.description
            }
        });
        return res.status(200).send(response);
    }
    return res.status(406).send({msg: 'Nenhum repositório encontrado'});
  } catch (error) {
    return res.status(500).send({msg: 'Serviço indisponível no momento'});
  }
};

