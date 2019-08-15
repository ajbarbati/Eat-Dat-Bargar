const connection = require ('./connection.js')

function printQuestionMarks(num) {
	const arr = []

	for (const i = 0; i < num; i++) {
		arr.push("?")
	}

	return arr.toString()
}

function objToSql(ob) {
	const arr = []

	for (const key in ob) {
		arr.push(key + "=" + ob[key])
	}

	return arr.toString()
}

const orm = {
	selectAll: function(tableInput, cb) {
		const queryString = "SELECT * FROM " + tableInput + ";"
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err
			}
			cb(result)
		})
	},
	insertOne: function(table, cols, vals, cb) {
		const queryString = "INSERT INTO " + table

		queryString += " ("
		queryString += cols.toString()
		queryString += ") "
		queryString += "VALUES ("
		queryString += printQuestionMarks(vals.length);
		queryString += ") "
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err
			}
			cb(result)
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		const queryString = "UPDATE " + table

		queryString += " SET "
		queryString += objToSql(objColVals)
		queryString += " WHERE "
		queryString += condition
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err
			}
			cb(result)
		})
	}
}
module.exports = orm