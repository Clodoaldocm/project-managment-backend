const connection = require('../database/connection');


module.exports = {
    //list Actions

    async index(request, response){
        const { idInd=0 } =  request.params;
        //console.log(id);
        var ind;
        if(idInd==0){
            ind = await connection('indicators')
            .select('*'); 
        }else{
            ind = await connection('indicators')
            .where('ind_id',idInd)
            .select('*')
            .first();
        }

        if(!ind){
            return response.status(400).json({ error: 'No Contributors founds'});
        }
        return response.json(ind);
    },
    //Create a New Action
    async create(request,response){

        const {
            ind_name, 
            ind_type,
        } = request.body;
    
        await connection('indicators').insert({
            ind_name, 
            ind_type, 
        })
        return response.json();
    },
    //Update Project
    async update(request,response){
        const { idInd } = request.params;

        const {
            ind_name, 
            ind_type,
        } = request.body;
    
        await connection('indicators')
        .where('ind_id',idInd)
        .update({
            ind_name, 
            ind_type,
        })
        return response.json();
    },

    //Delete Actions
    async delete(request,response){
        const { idInd } = request.params;
        
        //const ong_id = request.headers.authorization;

        const projs = await connection('projects')
            .where('proj_indicator_type', idInd)
            .select('proj_id')
            .first();

        if (projs){
            return response.status(401).json({ error: 'Indicador in Projects. Not Deleted'});
        }
        
        await connection('indicators').where('ind_id', idInd).delete();
        
        return response.status(204).json({Sucess: 'Indicator id:  deleted'});
    },
   
}