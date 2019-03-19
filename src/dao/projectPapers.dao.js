
const db = require(__base + "db/index");


/**
 * insert a projectPaper
 * @param {integer} paper_id
 * @param {integer} project_id
 * @param {object} newProjectPaperData
 * @returns {object} projectPaper created
 */
async function insert(paper_id, project_id, newProjectPaperData) {
    let res = await db.query(
            'INSERT INTO public.' + db.TABLES.projectPapers + '("id","date_created", "date_last_modified", "date_deleted", "data", "project_id") VALUES($1,$2,$3, $4, $5, $6) RETURNING *',
            [paper_id, new Date(), new Date(), null, newProjectPaperData, project_id]
            );
    return res.rows[0];
}



/**
 *  * update a projectPaper
 * @param {integer} paper_id
 * @param {integer}  projectPaper_id
 * @param {object} newProjectPaperData
 * @returns {integer} number of row affected , 1 if ok, 0 if failed
 */
async function update(paper_id, projectPaper_id, newProjectPaperData) {
    let res = await db.query(
            'UPDATE public.' + db.TABLES.projectPapers + ' SET "date_last_modified" = $1,  "data" = $2 WHERE "id" = $3 AND "project_id" = $4',
            [new Date(), newProjectPaperData, paper_id,projectPaper_id]
            );
    return res.rowCount;
}


/**
 *  * delete a projectPaper
 * @param {integer} paper_id
 * @param {integer} project_id
 * @returns {integer} number of row affected , 1 if ok, 0 if failed
 */
async function deletes(paper_id, project_id) {
    let res = await db.query(
            'DELETE FROM public.' + db.TABLES.projectPapers + ' WHERE id = $1 AND "project_id" = $2',
            [paper_id, project_id]
            );
    return res.rowCount;
}

/**
 * select a projectPaper
 * @param {integer} paper_id
 * @param {integer} project_id
 * @returns {object} projectPaper found
 */
async function selectById(paper_id, project_id) {
    let res = await db.query(
            'SELECT * FROM public.' + db.TABLES.projectPapers + ' WHERE id = $1 AND "project_id" = $2',
            [paper_id, project_id]
            );
    
    return res.rows[0];
}

/**
 * select all projectPaper associated with a project
 * @param {integer} project_id
 * @param {integer} number number of projectPapers
 * @param {integer} offset position where we begin to get
 * @param {string} orderBy order of record in table, {id or date_created or date_last_modified or date_deleted}
 * @param {string} sort {ASC or DESC}
 * @returns {Array[Object]} array of projectPapers 
 */
async function selectByProject(project_id , number, offset, orderBy, sort) {
    let res = await db.query(
            'SELECT * FROM public.' + db.TABLES.projectPapers + ' WHERE "project_id" = $1 ORDER BY '+orderBy+' '+sort+' LIMIT $2 OFFSET $3',
            [project_id, number, offset]
            );

    return res.rows;
}




module.exports = {
    insert,
    update,
    deletes,
    selectById,
    selectByProject

};