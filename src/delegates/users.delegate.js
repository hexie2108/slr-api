//library to check validity of google token
const {OAuth2Client} = require('google-auth-library');

const usersDao = require(__base + 'dao/users.dao');

//error handler
const errHandler = require(__base + 'utils/errors');
//supply the auxiliary function
const support = require(__base + 'utils/support');
//fetch request
const conn = require(__base + 'utils/conn');
//the config file
const config = require(__base + 'config');


/**
 * gets the users info and logs him in database
 */
async function userLogin(tokenId) {

    if (!tokenId) {
        throw errHandler.createBadRequestError("empty token id!");
    }

    //call Google api
    const oAuth2Client = new OAuth2Client(config.google_login_client_id);
    let ticket;
    try {
        ticket = await oAuth2Client.verifyIdToken({
            idToken: tokenId,
            audience: config.google_login_client_id,
        });
    }
    catch (e) {
        throw errHandler.createBadRequestError("the token is incorrect: "+e.message);
    }

    //get user object from response of google
    let user = ticket.getPayload();
    //set token_id
    user.token_id = tokenId;

    //check user's existence
    let existOfUser = await usersDao.checkUserByGoogleId(user.sub);

    let res;
    //if is a new user
    if(!existOfUser){
        res= await usersDao.insert(user);
    }
    else{
        res= await usersDao.updateByGoogleId(user.sub, user);
    }

    return {
        "user": {"email": user.email, "name": user.given_name, "surname": user.family_name, "image": user.picture},
        "token": tokenId
    };
}

/**
 * check user's existence by token Id
 * @param {int} token_id
 * @returns {boolean} true if found, false if not found
 */
async function checkUserByTokenId(tokenId) {

    if (!tokenId || tokenId === 'null') {
        throw errHandler.createBadRequestError("empty token id in header, the user must first login!");
    }

    //check user's existence in database
    let res =  await usersDao.checkUserByTokenId(tokenId);
    //if do not exist
    if(!res){
        throw errHandler.createBadRequestError("the token does not match any user!");
    }

}


module.exports = {
    userLogin,
    checkUserByTokenId,
};