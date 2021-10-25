module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("members", {
        email: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    })

    return Member
}
