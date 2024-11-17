class ApiFeatures {
  constructor(queryDoc, queryStrr) {
    this.queryDoc = queryDoc;
    this.queryStrr = queryStrr;
  }

  filter() {
    let queryObj = { ...this.queryStrr };
    const exclude = ['fields', 'sort', 'limit', 'page'];
    exclude.forEach((ele) => delete queryObj[ele]);

    // Log the query object before and after transformation
    console.log('Before transforming:', queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (m) => `$${m}`);
    queryStr = JSON.parse(queryStr);

    console.log('After transforming:', queryStr);

    this.queryDoc = this.queryDoc.find(queryStr);
    return this;
  }

  sort() {
    if (this.queryStrr.sort) {
      const sortBy = this.queryStrr.sort.split(',').join(' ');
      console.log('Sorting by:', sortBy); // Log to verify sort string
      this.queryDoc = this.queryDoc.sort(sortBy);
    } else {
      this.queryDoc = this.queryDoc.sort('createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStrr.fields) {
      const fields = this.queryStrr.fields.split(',').join(' ');
      this.queryDoc = this.queryDoc.select(fields);
    } else {
      this.queryDoc = this.queryDoc.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryStrr.page * 1 || 1;
    const limit = this.queryStrr.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.queryDoc = this.queryDoc.skip(skip).limit(limit);
    return this;
  }

  get query() {
    return this.queryDoc;
  }
}

module.exports = ApiFeatures;
