const connection = require('../database/connection');


module.exports = {
    //list Actions

    async index(request, response){
        const { idSector=0 } =  request.params;
        //console.log(id);
        var sector;
        if(idSector==0){
            sector = await connection('sector')
            .select('*');
            
        }else{
            sector = await connection('sector')
            .where('sector_id',idSector)
            .select('*')
            .first();   
        }

        if(!sector){
            return response.status(400).json({ error: 'No Sectors founds'});
        }
        return response.json(sector);
    },
    //Create a New Action
    async create(request,response){

        const {
            sector_name, 

        } = request.body;
    
        await connection('sector').insert({
            sector_name, 

        })
        return response.json();
    },
    //Update Project
    async update(request,response){
        const { idSector } = request.params;

        const {
            sector_name, 
        } = request.body;
        console.log(sector_name);
        await connection('sector')
        .where('sector_id',idSector)
        .update({
            sector_name, 
        })
        return response.json();
    },

    //Delete Actions
    async delete(request,response){
        const { idSector } = request.params;
        
        //const ong_id = request.headers.authorization;

        const projs = await connection('projects')
            .where('proj_sector', idSector)
            .select('proj_id')
            .first();

        if (projs){
            return response.status(401).json({ error: 'Sector in Projects. Not Deleted'});
        }else{
            const user = await connection('contributors')
            .where('contributor_sector', idSector)
            .select('contributor_id')
            .first();

            if (user){
                return response.status(401).json({ error: 'Sector in Contributors. Not Deleted'});
            }


        }
        
        await connection('sector').where('sector_id', idSector).delete();
        
        return response.status(204).json({Sucess: 'Setor id:  deleted'});
    },
   
}