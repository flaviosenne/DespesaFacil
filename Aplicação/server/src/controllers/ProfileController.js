const connection = require("../database/connection")

const { queryExpenseDatabaseCategory,
        queryExpenseDatabaseDateDefault,
        queryExpenseDatabaseDateAndCategory,
        queryExpenseDatabaseDate } = require('../services/helpers')

module.exports = {
    async indexExpense(req, res) {
        const { dateStart, dateEnd, category } = req.body

        const id_user = req.headers.authorization

        if (!category && !dateStart && !dateEnd) {
            const expense = await queryExpenseDatabaseDateDefault('expense', id_user)

            return res.json(expense)
        }

        if (dateStart && dateEnd && category) {
            const expense = await queryExpenseDatabaseDateAndCategory('expense', id_user, dateStart, dateEnd, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (category) {
            const expense = await queryExpenseDatabaseCategory('expense', id_user, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (dateStart && dateEnd) {
            const expense = await queryExpenseDatabaseDate('expense', id_user, dateStart, dateEnd)

            return res.json(expense)
        }

    },
    async indexRecep(req, res) {
        const { dateStart, dateEnd, category } = req.body

        const id_user = req.headers.authorization

        if (!category && !dateStart && !dateEnd) {
            const expense = await queryExpenseDatabaseDateDefault('recep',id_user)

            return res.json(expense)
        }

        if (dateStart && dateEnd && category) {
            const expense = await queryExpenseDatabaseDateAndCategory('recep',id_user, dateStart, dateEnd, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (category) {
            const expense = await queryExpenseDatabaseCategory('recep',id_user, category.toUpperCase().trim())

            return res.json(expense)
        }

        if (dateStart && dateEnd) {
            const expense = await queryExpenseDatabaseDate('recep',id_user, dateStart, dateEnd)

            return res.json(expense)
        }

    },
    async removeExpense(req, res) {
        const id_user = req.headers.authorization
        const { id } = req.params

        const expense = await connection('expense')
            .where('id', id)
            .andWhere('id_user', id_user)
            .delete()


        if (expense == 0) {
            res.status(404)
            return res.json({ msg: 'not found' })
        }

        res.status(204)
        return res.json({ msg: 'expense deleted' })
    }
}