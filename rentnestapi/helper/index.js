const db = require("../models/User")
// const helper = require("./user.js")


var sequelize = db.sequelize


const successResponse = (res, message, data = [],) => {
	code = 200
	res.send({
		status: code,
		message,
		data,
	});
}

const errorResponse = (
	res,
	errorMessage = 'Something went wrong',
	data
) => {
	code = 400
	message = errorMessage
	res.send({
		status: code,
		message,
		data
	});
}


// function cleanString(str) {
// 	return (str || "")
// }

// // convert string in to sql storable form
// function mysql_real_escape_string(str) {
// 	var str = cleanString(str)
// 	return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
// 		switch (char) {
// 			case "\0":
// 				return "\\0";
// 			case "\x08":
// 				return "\\b";
// 			case "\x09":
// 				return "\\t";
// 			case "\x1a":
// 				return "\\z";
// 			case "\n":
// 				return "\\n";
// 			case "\r":
// 				return "\\r";
// 			case "\"":
// 			case "'":
// 			case "\\":
// 			case "%":
// 				return "\\" + char; // prepends a backslash to backslash, percent,
// 			// and double/single quotes
// 		}
// 	});
// }


// function mysql_unreal_escape_string(string) {
// 	// return string
// 	return ((cleanString(string)).replaceAll("\"", ''))

// }

// // Return image with url
// const getBlobTempPublicUrl = (blobName) => {
// 	return (blobName == "" || blobName == undefined || blobName == null) ? "" : "" + blobName
// }
// const categoryURL = (blobName) => {
// 	return (blobName == "" || blobName == undefined || blobName == null) ? "" : getBlobTempPublicUrl("icons/" + blobName)
// }
// const videoUrl = (blobName) => {
// 	return (blobName == "" || blobName == undefined || blobName == null) ? "" : getBlobTempPublicUrl("videos/" + blobName)
// }



// const generateCode = (userId, string) => {
// 	var code = "";
// 	strlen = ((userId).toString()).length // find length
// 	for (var i = 0; i < (5 - (strlen)); i++) {
// 		code += "0";
// 	}
// 	return string + code + (userId)
// }



// // const uniqueId = async () => {
// // 	var id = crypto.randomBytes(30).toString("hex");
// // 	var check = await helper.checktoken(id);
// // 	while (check.length != 0) {
// // 		id = await uniqueId()
// // 	}
// // 	return id;
// // }
// const validateData = (data2) => {
// 	const data = cleanString(data2)
// 	if (data == null || data == undefined || data == "") {
// 		return true
// 	} else {
// 		return false
// 	}
// }
// const ucFirst = (string) => {
// 	return string.charAt(0).toUpperCase() + string.slice(1);
// }

// const ucwords = (string) => {
// 	var words = string.toLowerCase().split(' ');
// 	for (var i = 0; i < words.length; i++)
// 		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
// 	return words.join(' ');
// }

// const saveResizedImage = (path, filename) => {
// 	sharp(path).resize(100, 100, {
// 		fit: sharp.fit.inside,
// 		withoutEnlargement: true, // if image's original width or height is less than specified width and height, sharp will do nothing(i.e no enlargement)
// 	}).toFormat("jpeg").toFile(`./media/images/resized_${filename}`);
// 	return `resized_${filename}`;
// }



// const insertData = async (tableName, data) => {
// 	try {
// 		const model = db[tableName];
// 		if (!model) {
// 			throw new Error(`Table '${tableName}' not found in the database.`);
// 		}

// 		const insertedData = await model.create(data);
// 		return insertedData;
// 	} catch (error) {
// 		throw new Error(`Error inserting data into table '${tableName}': ${error.message}`);
// 	}
// };

// const updateModel = async (model, query, condition) => {
// 	var data = await model.update(query, condition);
// 	return data
// }

// const saveModel = async (model, payload) => {
// 	var data = await model.create(payload);
// 	return data.dataValues
// }


// const updateWithoutModel = async (model, query = {}, condition) => {
// 	const joinedModel = db[model]
// 	var data = await joinedModel.update(query, { where: condition });
// 	return data
// }


// const saveWithoutModel = async (model, payload) => {
// 	const joinedModel = db[model]
// 	var data = await joinedModel.create(payload);
// 	return data.dataValues
// }

// const selectWithJoins = async (tableName, joinTables = [], whereClause = {}, attributes = [], order = [], limit = null) => {
// 	const model = db[tableName]


// 	const options = {
// 		where: whereClause,
// 		attributes: attributes.length ? attributes : undefined,
// 		order: order.length ? order : undefined,
// 		raw: true
// 	}

// 	if (limit != null && limit != undefined) {
// 		options["limit"] = limit
// 	}
// 	// Build the join query
// 	joinTables.forEach(({ table, alias, onClause }) => {
// 		const joinedModel = db[table]
// 		options.include = options.include || []
// 		options.include.push({
// 			model: joinedModel,
// 			as: alias,
// 			required: true,
// 			on: onClause
// 		})
// 	})
// 	return await model.findAll(options)
// }


// const getResult = async (query) => {
// 	return await db.sequelize.query(query, {
// 		type: db.sequelize.QueryTypes.SELECT
// 	})
// }

module.exports = {
	// getBlobTempPublicUrl,
	// selectWithJoins,
	// saveModel,
	// updateModel,
	// insertData,
	// updateWithoutModel,
	// saveWithoutModel,
	// validateData,
	// saveResizedImage,
	// mysql_real_escape_string,
	successResponse,
	errorResponse,
	// uniqueId,
	// cleanString,
	// generateCode,
	// ucFirst,
	// ucwords,
	// getResult
}