//scheme of paper, has 13 attributes, it is used only for the validation of the custom paper
const paper = {
    "type": "object",
    "properties": {
        "authors": {
            "type": "string",
            "isNotEmpty": true
        },
        "title": {
            "type": "string",
            "isNotEmpty": true
        },
        "year": {
            "type": "string",
            "isNotEmpty": true
        },
        "date": { /* temporarly unused */
            "type": "string"
        },
        "source_title": {
            "type": "string",
            "isNotEmpty": true
        },
        "link": {
            "type": "string",
            "isNotEmpty": true
        },
        "abstract": {
            "type": "string",
            "isNotEmpty": true
        },
        "document_type": {
            "type": "string",
            "isNotEmpty": true
        },
        "source": {
            "type": "string",
            "isNotEmpty": true
        },
        "eid": {
            "type": "string"
        },
        "abstract_structured": {
            "type": "string",

        },
        "filter_oa_include": {
            "type": "string",

        },
        "filter_study_include": {
            "type": "string",

        },
        "notes": {
            "type": "string",

        },
        "manual": {
            "type": "string",
            "isNotEmpty": true
        },
        "doi": {
            "type": "string"
        }
    },
    "required": ["authors", "title", "year", "source_title", "link", "abstract", "document_type", "source", "abstract_structured", "filter_oa_include", "filter_study_include", "notes", "manual", "doi"]
};

//is the same with paper object
const projectPaper = paper;

const csvPaperFields = {
    "type": "object",
    "properties": {
        "authors": {
            "type": "string"
        },
        "title": {
            "type": "string"
        },
        "year": {
            "type": "string"
        },
        "date": { /* temporarly unused */
            "type": "string"
        },
        "source_title": {
            "type": "string"
        },
        "link": {
            "type": "string"
        },
        "abstract": {
            "type": "string"
        },
        "document_type": {
            "type": "string"
        },
        "source": {
            "type": "string"
        },
        "eid": {
            "type": "string"
        },
        "abstract_structured": {
            "type": "string",

        },
        "filter_oa_include": {
            "type": "string",

        },
        "filter_study_include": {
            "type": "string",

        },
        "notes": {
            "type": "string",

        },
        "manual": {
            "type": "string"
        },
        "doi": {
            "type": "string"
        }
    },
    "required": ["authors", "title", "year", "source_title", "link", "abstract", "document_type", "source", "abstract_structured", "filter_oa_include", "filter_study_include", "notes", "manual", "doi"]
};

//scheme of project, has 2 attributes
const project = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "isNotEmpty": true
        },
        "description": {
            "type": "string",
            "isNotEmpty": true
        }
    },
    "required": ["name", "description"]
};

//scheme of filtes
const filter={
    "type": "object",
    "properties": {
        "project_id": {
            "type": "string",
            "isNotEmpty": true
        },
        "name": {
            "type": "string",
            "isNotEmpty": true
        },
        "predicate": {
            "type": "string",
            "isNotEmpty": true
        },
        "inclusion_description": {
            "type": "string",
            "isNotEmpty": true
        },
        "exclusion_description": {
            "type": "string",
            "isNotEmpty": true
        }
    },
    "required": ["project_id", "name", "predicate",  "inclusion_description", "exclusion_description"]
}


module.exports = {
    paper,
    project,
    projectPaper,
    csvPaperFields,
    filter,
};
