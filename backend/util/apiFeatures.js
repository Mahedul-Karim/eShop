class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryStringCopy = { ...this.queryString };
    const removeItems = ["keyword", "limit", "page"];
    removeItems.forEach((item) => delete queryStringCopy[item]);

    let queryString = JSON.stringify(queryStringCopy);
    queryString = queryString.replace(
      /\b(gt|lt|gte|lte|eq)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryString));
    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }
  pagination(itemPerPage){
    if(!this.queryString.page){
      return this;
    }
    const currentPage = +this.queryString.page || 1;
    const skip = itemPerPage * (currentPage - 1);
    this.query=this.query.limit(itemPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
