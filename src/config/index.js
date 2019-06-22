

module.exports = {
    "home_url_for_email" : process.env.HOME_URL_FOR_EMAIL,

    "db": {
        // were not used
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,

        // heroku postgres adds automatically DATABASE_URL.
        url: process.env.DATABASE_URL
    },
    "db_tables":{
        papers: 'papers',
        projects: 'projects',
        projectPapers: 'project_papers',
        users: 'users',
    },

    //local port to start the service
    "listening_port": 3001,
    //the number of element for each page
    "pagination":{
        defaultCount: 10
    },


    //the pdf parse service
    "pdf_parse_server": "http://scienceparse.allenai.org/v1",
    //the similar paper service
    "search_similar_server" : undefined, //here you can put the url of the remote(or local) service that will search for similar papers

    "google":{
        //the google authentication service
        "google_login_client_id": process.env.GOOGLE_LOGIN_CLIENT_ID,
        "google_gmail" : process.env.GOOGLE_GMAIL,
        "google_gmail_pwd" : process.env.GOOGLE_GMAIL_PWD
    },

    //valid keywords for searchBy
    validSearchBy: ["all","author","content","advanced"],
    //the arXiv parameters
    "arxiv":{
        url: "http://export.arxiv.org/api/query"
    },
    //the scopus parameters
    "scopus":{
        apiKey: process.env.SCOPUS_APIKEY ,
        url: "https://api.elsevier.com/content/search/scopus",
    },

    "file":{
        //the directory to save the uploaded file
        "tmp_directory": "./tmp/",
        //maximum number of files in tmp folder, in any case it must be >=1
        "max_number": 20
    }





};
