const connection = require('../database/connection');


module.exports = {
    //list Actions

    async index(request, response){
        const { id=0 } =  request.params;
        //console.log(id);
        var user;
	if(id==0){
		user = await connection('contributors')
       	 	.innerJoin('sector','contributor_sector','sector_id')
        	.select('*');
	}else{
		user = await connection('contributors')
		.innerJoin('sector','contributor_sector','sector_id')
		.where('contributor_id',id)		
        .select('*')
        .first();
	}

        if(!user){
            return response.status(400).json({ error: 'No Contributors founds'});
        }
        return response.json(user);
    },
    //Create a New Action
    async create(request,response){

        const {
            contributor_name, 
            contributor_function,
            contributor_sector,
        } = request.body;
    
        await connection('contributors').insert({
            contributor_name, 
            contributor_function,
            contributor_sector, 
        })
        return response.json();
    },
    //Update Project
    async update(request,response){
        const { idUser } = request.params;

        const {
            contributor_name, 
            contributor_function,
            contributor_sector,
        } = request.body;
    
        await connection('contributors')
        .where('contributor_id',idUser)
        .update({
            contributor_name, 
            contributor_function,
            contributor_sector,
        })
        return response.json();
    },

    //Delete Actions
    async delete(request,response){
        const { idUser } = request.params;
        
        //const ong_id = request.headers.authorization;

        const projs = await connection('projects')
            .where('proj_responsible', idUser)
            .select('proj_responsible')
            .first();

        if (projs){
            return response.status(401).json({ error: 'User in Projects. Not Deleted'});
        }else{
            const action = await connection('actions')
                .where('action_responsible', idUser)
                .select('action_responsible')
                .first(); 
                if(action){
                    return response.status(401).json({error: 'User in Actions. Not deleted.'});
                }
        }
          

        await connection('contributors').where('contributor_id', idUser).delete();
        
        return response.status(204).json({Sucess: 'User id: '+idUser+' deleted'});
    },
   
}
