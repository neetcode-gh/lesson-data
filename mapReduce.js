var mapFunction = function() {
    emit(this.property_type, {count: 1, reviews: this.number_of_reviews, price: this.price});
};

var reduceFunction = function(key, values) {
    var result = {count: 0, reviewCount: 0, price: 0};
    values.forEach(function(value) {
        result.count += value.count;
        result.reviewCount += value.reviews;
        result.price += value.price;
    });
    return result;
};

var finalizeFunction = function (key, reducedValue) {
    reducedValue.avgPrice = Math.ceil(reducedValue.price / reducedValue.count);
    delete reducedValue.price;
    return reducedValue;
};

db.listingsAndReviews.mapReduce(
    mapFunction,
    reduceFunction,
    {
        query: { number_of_reviews: { $gte: 100 } },
        out: { inline: 1 },
        finalize: finalizeFunction
    }
)
