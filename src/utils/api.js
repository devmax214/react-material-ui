import axios from 'axios'
import { handleError } from 'utils/helpers'

const singleton = Symbol('SINGLETON')
const singletonEnforcer = Symbol('SINGLETON_ENFORCER')

class Api {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton')
        }

        this._type = 'SingletonEnforcer'

        this.session = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new Api(singletonEnforcer)
        }

        return this[singleton]
    }

    run = (func, params) => {
        const isAdmin = window.location.href.indexOf('/admin') !== -1
        const token = isAdmin ? localStorage.getItem('admin-token') : localStorage.getItem('token')
        if (token !== null) {
            this.session.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        return func(...params).catch((error) => handleError(error))
    }

    get = (...params) => this.run(this.session.get, params)
    put = (...params) => this.run(this.session.put, params)
    post = (...params) => this.run(this.session.post, params)
    patch = (...params) => this.run(this.session.patch, params)
    delete = (...params) => this.run(this.session.delete, params)
    all = axios.all
}

export default Api.instance
