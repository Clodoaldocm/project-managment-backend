const connection = require('../database/connection');

module.exports = {
    //list Actions
    async index(request, response){
        const { id=1 } =  request.body;
        //console.log(id);
        const action = await connection('actions')
        .where('action_project',id)
        .select('*');

        if(!action){
            return response.status(400).json({ error: 'No Projects founds'});
        }
        return response.json(action);
    },
    //Create a New Action
    async create(request,response){
        const {
            action_project, 
            action_title,
            action_objetive,
            action_responsible,
            action_date_start,
            action_date_end,
            action_deadline,
            action_how_do,
            action_final
        } = request.body;
    
        await connection('actions').insert({
            action_project, 
            action_title,
            action_objetive,
            action_responsible,
            action_date_start,
            action_date_end,
            action_deadline,
            action_how_do,
            action_final, 
        })
        return response.json();
    },
    //Update Project
    async update(request,response){
        const { idAction } = request.params;

        const {
            action_title,
            action_objetive,
            action_responsible,
            action_date_start,
            action_date_end,
            action_deadline,
            action_how_do,
            action_final,
        } = request.body;
    
        await connection('actions')
        .where('action_id',idAction)
        .update({
            action_title,
            action_objetive,
            action_responsible,
            action_date_start,
            action_date_end,
            action_deadline,
            action_how_do,
            action_final, 
        })
        return response.json();
    },

    //Delete Actions
    async delete(request,response){
        const { idAction } = request.params;
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

        await connection('actions').where('action_id', idAction).delete();
        
        return response.status(204).send();
    },
   
}