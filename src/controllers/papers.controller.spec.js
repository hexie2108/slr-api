const request = require('supertest');

const app = require(__base + 'app');


var sample1 = {"content": {"Authors": "aa",
        "Title": "aaa",
        "Year": "2099",
        "Source title": "aaa",
        "Link": "https://www.scopus.com/",
        "Abstract": "abc",
        "Document Type": "Article",
        "Source": "Scopus",
        "EID": "111",
        "abstract_structured": "1",
        "filter_OA_include": "1",
        "filter_study_include": "0",
        "notes": ""
    }
};

var sample2 = {
    "date_created": "2019-03-07T19:47:54.263Z",
    "date_last_modified": "2019-03-07T19:47:54.263Z",
    "date_deleted": null,
    "content": {
        "Authors": "Momeni M., Hariri N., Nobahar M., Noshinfard F.",
        "Title": "Older adults experiences of online social interactions: A phenomenological study",
        "Year": "2018",
        "Source title": "Koomesh",
        "Link": "https://www.scopus.com/inward/record.uri?eid=2-s2.0-85044209383&partnerID=40&md5=8e7d3696529db8d226bde6114a2e524a",
        "Abstract": "Introduction: Online social networks allow users, who are anywhere in the world, to communicate with other people with text, audio, and video. Studies have shown that older adults use of social networks and online communication can increase social support, improve quality of life and increase their health. The purpose of this study was to understand the older adult's experiences of online Social Interactions. Materials and Methods: This study was performed following a qualitative approach and phenomenological methodology in Semnan (Iran) in 2016. The studied sample was taken by purposive sampling method. Required data was collected via deep and semi-structured interviews with 9 older adults who were active members of at least one online social network. The obtained data was analyzed using the seven-step Colaizzi's method. Results: From data analysis, the main theme of \"developed social interactions\" was extracted from five sub-themes: \"interaction with family and friends\", \"revival of old relationships\", \"familiar with people with common interests\", \"impalpable control\" and \"liberation from loneliness\". Conclusion: The results explained the various dimensions of the use of the older adults from online social networks and showed that these networks have the potential to be used to enhance social interactions in aging. The results of this study can help planners by identifying the benefits of these networks, while taking necessary interventions to increase the use of the elderly from these networks, promote social interactions and, consequently, promote the health of the elderly. © 2018, Semnan University of Medical Sciences. All rights reserved.",
        "Document Type": "Article",
        "Source": "Scopus",
        "EID": "2-s2.0-85044209383",
        "abstract_structured": "1",
        "filter_OA_include": "1",
        "filter_study_include": "0",
        "notes": ""
    }
};

var sample3 = {"content2": {"Authors": "aa",
        "Title": "aaa"
    }
};

var sample4 = {
    "date_last_modified": "2019-03-07T19:47:54.263Z",
    "date_deleted": null,
};



test('dummy test', () => {
    expect(true).toBe(true);
});

/* good cases*/
describe('good cases', () => {

    test('GET /search should return 200 if find any papers', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/search?query=2015');
        expect(response.status).toBe(200);
    });

    test('GET /papers should return 200 if it finds something', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/papers');
        expect(response.status).toBe(200);
    });

    test('GET /papers/500 should return 200 and paper if it finds something', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/papers/500');
        expect(response.status).toBe(200);
    });

    test('POST AND DELETE /papers/ should return 201 and 204 if both are ok', async () => {
        jest.setTimeout(10000);
        let response = await request(app).post('/papers').send(sample1).set('Accept', 'application/json');
        expect(response.status).toBe(201);
        let result = await response.body;
        response = await request(app).delete('/papers/' + result.id);
        expect(response.status).toBe(204);
    });

    test('PUT /papers/501 should return 204 if exists the specific paper', async () => {
        jest.setTimeout(10000);
        let response = await request(app).put('/papers/501').send(sample2).set('Accept', 'application/json');
        expect(response.status).toBe(204);
    });

});






/*bad cases*/
describe('bad cases', () => {


    test('GET /search should return 400 if mandatory field is not present', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/search');
        expect(response.status).toBe(400)
    });
    test('GET /search should return 404 if no paper is found', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/search?query=uaidafha');
        expect(response.status).toBe(404)
    });
    test('GET /papers/:id should return 404 if it finds nothing', async () => {
        jest.setTimeout(10000);
        let response = await request(app).get('/papers/0');
        expect(response.status).toBe(404)
    });

    test('POST /papers/ should return 400 if mandatory field is not present', async () => {
        jest.setTimeout(10000);
        let response = await request(app).post('/papers').send(sample3).set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });

    test('PUT /papers/501 should return 400 if mandatory field is not present', async () => {
        jest.setTimeout(10000);
        let response = await request(app).put('/papers/501').send(sample4).set('Accept', 'application/json');
        expect(response.status).toBe(400);
    });

    test('PUT /papers/99999999 should return 404 if papers is not present', async () => {
        jest.setTimeout(10000);
        let response = await request(app).put('/papers/99999999').send(sample2).set('Accept', 'application/json');
        expect(response.status).toBe(404);
    });


    test('DELETE /papers/qqq should return 400 if mandatory field is not valid', async () => {
        jest.setTimeout(10000);
        let response = await request(app).delete('/papers/qqq');
        expect(response.status).toBe(400);
    });

    test('DELETE /papers/99999999 should return 404 if papers is not present', async () => {
        jest.setTimeout(10000);
        let response = await request(app).delete('/papers/99999999');
        expect(response.status).toBe(404);
    });


});