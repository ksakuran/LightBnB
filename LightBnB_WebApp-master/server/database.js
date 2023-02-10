const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

// test database is connected
//pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const emailAddress = email
  
  return pool
  .query(
    `SELECT * FROM users
    WHERE email = $1;
    `, [emailAddress])
  .then((result) => {
    if (result.rows[0]) {
      //console.log(result.rows[0])
    return result.rows[0];
    }
    return null;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(
    `SELECT * FROM users
    WHERE id = $1;
    `, [id])
  .then((result) => {
    if (result.rows[0]) {
      //console.log(result.rows[0])
    return result.rows[0];
    }
    return null;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  const name = user.name;
  const password = user.password;
  const email = user.email

  return pool
  .query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *;
    `, [name, email, password])
  .then((result) => {
    if (result.rows[0]) {
      //console.log(result.rows[0])
    return result.rows[0];
    }
    return null;
  })
  .catch((err) => {
    console.log(err.message);
  });
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const id = guest_id;
  const limitRecords = limit;

  return pool
  .query(
    `SELECT properties.* 
    FROM properties
    JOIN reservations ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`, [id, limitRecords]
  ).then((res) => {
    //console.log(res.rows[0])
    if (res.rows) {
    return res.rows;
    }
    return null;

  }).catch((err) => {
    console.log(err.message);
  })

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = (options, limit = 10) => {

  const city = options.city;
  const owner = options.owner_id;
  const minPrice = `${options.minimum_price_per_night}`;
  const maxPrice = `${options.maximum_price_per_night}`;
  const minRating = options.minimum_rating;

  let whereOrAnd = ` AND`
  let queryParams = [];
  let queryString = `SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id`

  if (city) {
    queryParams.push(`%${city}%`);
    queryString += ` WHERE city LIKE $${queryParams.length}`;
  }

  if (owner) {
    queryParams.push(`${owner}`);
     if (queryParams.length === 0) {
      whereOrAnd = ` WHERE`;
     }
     queryString += `${whereOrAnd} owner_id = $${queryParams.length}`;

  }

  if (minPrice) {
    queryParams.push(`${minPrice}00`);
    if (queryParams.length === 0) {
      whereOrAnd = ` WHERE`;
     }
    queryString += `${whereOrAnd} properties.cost_per_night >= $${queryParams.length}`;
  }

  if (maxPrice) {
    queryParams.push(`${maxPrice}00`);
    if (queryParams.length === 0) {
      whereOrAnd = ` WHERE`;
     }
    queryString += `${whereOrAnd} properties.cost_per_night <= $${queryParams.length}`;
  }

  if (minRating) {
    queryParams.push(`${minRating}`);
    queryString += ` GROUP BY properties.id HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
    queryParams.push(limit);
    queryString += ` 
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

  if (!minRating) {
    queryParams.push(limit);
    queryString += ` 
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }
  

  console.log(queryString, queryParams);

 return pool
    .query(
      queryString, queryParams)
    .then((result) => {
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
