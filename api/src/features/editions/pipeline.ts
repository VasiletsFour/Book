export const lookUp = {
    $lookup: {
        from: "authors",
        let: { author_id: "$author_id", id: "$_id" },
        pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$author_id"] }, remove_author: false } },
            { $project: { _id: false, id: "$_id", name: "$name" } }
        ],
        as: "author"
    }
};

export const project = {
    $project: {
        _id: false,
        id: "$_id",
        name: "$name",
        description: "$description",
        type: "$type",
        price: "$price",
        currency: "$currency",
        author: "$author"
    }
};
