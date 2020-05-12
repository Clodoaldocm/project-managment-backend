const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { id='projs' } =  request.params;
        //console.log(id);
        var proj;
        if(id=='projs'){
            proj = await connection('projects')
        //.where('id',id)
            .innerJoin('contributors','proj_responsible','contributor_id')
            .innerJoin('sector','proj_sector','sector_id')
            .select('proj_id','proj_title','contributor_name','sector_name','proj_date_start','proj_deadline','proj_date_end');
        }else{
            proj = await connection('projects')
                .where('proj_id',id)
                .innerJoin('contributors','proj_responsible','contributor_id')
                .innerJoin('sector','proj_sector','sector_id')
                .innerJoin('indicators','proj_indicator_type','ind_id')
                .select('projects.*', 'contributors.*', 'sector.*', 'indicators.*')
                .first();
      
        }    
        if(!proj){
            return response.status(400).json({ error: 'No Projects founds'});
        }
        return response.json(proj);
    },
    //Create a New Project
    async create(request,response){
        const {proj_title, proj_objective, proj_justification, proj_sector, proj_responsible,
            proj_indicator_type,proj_value_indicator,proj_date_start,proj_deadline,proj_custoIni,
             proj_value_actual, proj_value_esp} = request.body;
    
    await connection('projects').insert({
            proj_title,
            proj_objective,
            proj_justification,
            proj_sector,
            proj_responsible,
            proj_indicator_type,
            proj_value_indicator,
            proj_date_start,
            proj_deadline,
            proj_custoIni,
            proj_value_actual,
            proj_value_esp, 
        })

    //console.log(data);s

        return response.json();
    },
    //Create a New Project
    async update(request,response){
        const { id } = request.params;

        const {proj_title, proj_objective, proj_justification, proj_sector, proj_responsible,
            proj_indicator_type,proj_value_indicator,proj_date_start,proj_deadline,proj_custoIni,
             proj_value_actual, proj_value_esp} = request.body;
    
    //const id = crypto.randomBytes(4).toString('HEX');

    
        await connection('projects')
        .where('proj_id',id)
        .update({
            proj_title,
            proj_title,
            proj_objective,
            proj_justification,
            proj_sector,
            proj_responsible,
            proj_indicator_type,
            proj_value_indicator,
            proj_date_start,
            proj_deadline,
            proj_custoIni,
            proj_value_actual,
            proj_value_esp, 
        })

    //console.log(data);s

        return response.json();
    },
    //Excluir um Projeto
    async delete(request,response){
        const { id } = request.params;
        /*
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
         */   

        await connection('projects').where('proj_id', id).delete();
        
        return response.status(204).send();
    },
   
}