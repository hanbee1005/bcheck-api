module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("books", {
        title: {
            type: DataTypes.STRING
        },
        link: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        discount: {
            type: DataTypes.STRING
        },
        publisher: {
            type: DataTypes.STRING
        },
        pubdate: {
            type: DataTypes.STRING
        },
        isbn: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        owner_email: {
            type: DataTypes.STRING
        },
        owner_name: {
            type: DataTypes.STRING
        },
        del_yn: {
            type: DataTypes.STRING
        },
        del_cd: {
            type: DataTypes.STRING
        },
        del_nm: {
            type: DataTypes.STRING
        },
        del_msg: {
            type: DataTypes.STRING
        },
    })

    return Book
}
