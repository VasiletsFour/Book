export const pagination = (limit: number, page: number) => {
    if (page === 1 || page === 0) {
        return { limit: limit, start: 0 };
    }

    return { limit: limit, start: page * limit + 1 };
};

