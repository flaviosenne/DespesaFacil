const connection = require("../database/connection")

const {
    queryExpenseDatabaseCategory,
    queryExpenseDatabaseDateDefault,
    queryExpenseDatabaseDateAndCategory,
    queryExpenseDatabaseDate,

    queryRecepDatabaseCategory,
    queryRecepDatabaseDateDefault,
    queryRecepDatabaseDateAndCategory,
    queryRecepDatabaseDate,


    queryDatabaseCategory,
    queryDatabaseDateDefault,
    queryDatabaseDateAndCategory,
    queryDatabaseDate,

    existUserDatabase } = require('../services/helpers')

module.exports = {
    
    async indexFlow(req, res) {
        const { dateStart, dateEnd, category, type } = req.body

        const id_user = req.headers.authorization

        if (type == 'expense') {

            if (!category && !dateStart && !dateEnd) {
                const flow = await queryExpenseDatabaseDateDefault(id_user)

                return res.json(flow)
            }

            if (dateStart && dateEnd && category) {
                const flow = await queryExpenseDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

                return res.json(flow)
            }

            if (category) {
                console.log(category)
                const flow = await queryExpenseDatabaseCategory(id_user, category)

                return res.json(flow)
            }

            if (dateStart && dateEnd) {
                const flow = await queryExpenseDatabaseDate(id_user, dateStart, dateEnd)

                return res.json(flow)
            }

        }

        if (type == 'recep') {
            if (!category && !dateStart && !dateEnd) {
                const flow = await queryRecepDatabaseDateDefault(id_user)

                return res.json(flow)
            }

            if (dateStart && dateEnd && category) {
                const flow = await queryRecepDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

                return res.json(flow)
            }

            if (category) {
                console.log(category)
                const flow = await queryRecepDatabaseCategory(id_user, category)

                return res.json(flow)
            }

            if (dateStart && dateEnd) {
                const flow = await queryRecepDatabaseDate(id_user, dateStart, dateEnd)

                return res.json(flow)
            }

            if (type) {
                const flow = await queryRecepDatabaseDate(id_user, dateStart, dateEnd)

                return res.json(flow)
            }
        }


        if (!category && !dateStart && !dateEnd) {
            const flow = await queryDatabaseDateDefault(id_user)

            return res.json(flow)
        }

        if (dateStart && dateEnd && category) {
            const flow = await queryDatabaseDateAndCategory(id_user, dateStart, dateEnd, category)

            return res.json(flow)
        }

        if (category) {

            const flow = await queryDatabaseCategory(id_user, category)

            return res.json(flow)
        }

        if (dateStart && dateEnd) {
            const flow = await queryDatabaseDate(id_user, dateStart, dateEnd)

            return res.json(flow)
        }
    },

    async removeFlow(req, res) {
        const id_user = req.headers.authorization
        const { id } = req.params

        const flow = await connection('flow')
            .where('id', id)
            .andWhere('id_user', id_user)
            .delete()


        if (flow == 0) {
            res.status(404)
            return res.json({ msg: 'not found' })
        }

        return res.status(204).json({ msg: 'expense deleted' })
    },

    async createFlow(req, res) {
        const day =
            (new Date().getDate()) < 10 ?
                +'0' + (new Date().getDate()) :
                (new Date().getDate())

        const month =
            (new Date().getMonth() + 1) < 10 ?
                +'0' + (new Date().getMonth() + 1) :
                (new Date().getMonth() + 1)

        const year = new Date().getFullYear()

        const { description, status, type, value, date, category } = req.body
        const id_user = req.headers.authorization

        const user = await existUserDatabase(id_user)

        if (!user) return res.json({ msg: 'user not found' })


        var id_category = await connection('category')
            .select()
            .where('category', category.toUpperCase().trim())
            .first()

        if (!id_category)
            id_category = await connection('category').insert(
                { category: category.toUpperCase().trim() })


        console.log(type)
        const [id] = await connection('flow').insert({
            category: id_category.id,
            type,
            description: description.trim(),
            status: !status ? 'pendente' : status,
            value,
            date: !date ? (year + '-' + month + '-' + day) : date,
            id_user
        })

        return res.json({ id })


    },

    async updateFlow(req, res) {

        const { id } = req.params
        const id_user = req.headers.authorization

        const { description, status, date, value, category } = req.body
       
        var id_category = await connection('category')
            .select()
            .where('category', category.toUpperCase().trim())
            .first()

        if (!id_category) {

            await connection('category').insert(
                { category: category.toUpperCase().trim() })

            id_category = await connection('category')
                .select()
                .where('category', category.toUpperCase().trim())
                .first()
        }

        const flow = await connection('flow')
            .update({
                description, status, date, value,
                category: id_category.id
            })
            .where('id', id)
            .andWhere('id_user', id_user)


        if (flow == 0) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json({ msg: "updated success" })
    },

    async getOneFlow(req, res) {

        const { id } = req.params
        const flow = await connection('flow')
            .select()
            .where('id', id).first()


        if (!flow) {
            return res.status(404).json({ msg: 'not found' })
        }

        return res.json(flow)
    }

}