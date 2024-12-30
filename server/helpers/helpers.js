const Task = require('../models/task')
const Employee = require("../models/employee")

const getPaginatedResult = async (query) => {
    query = query || {}
    // If a limit is specified, use it. Else default to 20
    let limit = Number(query.limit) || 20
    if (limit < 1) { limit = 20 }
    if (limit > 50) { limit = 50 }
    // If an offset is specified, use it. Else default to 0
    // i.e no offset -> first page
    let skip = +query.offset || 0
    if (skip < 1) { skip = 0 }
    const items = await query.model.find(query.searchFor || {})
    .limit(limit)
    .skip(skip);
    const total = await query.model.countDocuments(query.searchFor || {})
  
    return {
      offset: skip,
      limit,
      total,
      items
    }
  }

  module.exports = {
    getPaginatedResult
  };