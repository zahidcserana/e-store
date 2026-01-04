import { defineStore } from 'pinia'
import { authApi } from '../api/authApi'

export const useAuthStore = defineStore('form', {
	state: () => ({
		bannerState: 'hide',
		company: '',
		name: '',
		email: '',
		phone: '',
		address: '',
		zip: '',
		city: '',
		area: '',
		country: 'Bangladesh',
		payment: 'cash',
		comment: '',
		showErrors: false,
	}),
	actions: {
		formatData() {
			return {
				locale: 'en',
				currency: 1,
				weight_unit: 'kg',
				dimensions_unit: 'cm',
				picking_route_strategy: 'alphanumerically',
				handling_instructions: this.comment || '',
				contact_information: {
					name: this.name,
					company_name: this.company,
					address: this.address,
					city: this.city,
					state: this.area,
					zip: this.zip,
					country_id: '50',
					email: this.email,
					phone: this.phone,
				}
			}
		},

		async makeOrder() {
			try {
				const data = this.formatData()
				console.log('📦 Sending request:', data)

				const res = await authApi.create(data)
				console.log('✅ Order response:', res)

				// clear cart or show banner
				this.bannerOn()
				// cartStore.clearCart?.() // optional if you have a clearCart action
			} catch (err: any) {
				console.error('❌ Order submission failed:', err)
				alert('Something went wrong while creating the order.')
			}
		},
		bannerOn() {
			this.bannerState = 'show'
		},
		bannerOff() {
			this.bannerState = 'hide'
		},
		setCash(e: Event) {
			e.preventDefault()
			this.payment = 'cash'
		},
		setElectronic(e: Event) {
			e.preventDefault()
			this.payment = 'electonic'
		},
		submit() {
			if (this.isValidPhone === 'false') {
				alert('Please enter all required fields!')
				return
			}

			const allSet =
				this.isValidCompany === 'true' &&
				this.isValidName === 'true' &&
				this.isValidEmail === 'true' &&
				this.isValidPhone !== 'false' &&
				this.isValidAddress === 'true' &&
				this.isValidZip === 'true' &&
				this.isValidCity === 'true' &&
				this.isValidArea === 'true' &&
				this.isValidCountry === 'true'

			if (allSet) {
				this.makeOrder(this)
				
				// send data to api
				this.showErrors = false
				this.bannerOn()
				return
			}

			this.showErrors = true
		},
	},
	getters: {
		// eslint-disable-next-line
		showBanner(state: any) {
			if (state.bannerState == 'show') {
				return true
			}
			return false
		},
		// eslint-disable-next-line
		choseCash(state: any) {
			if (state.payment == 'cash') {
				return true
			}
			return false
		},
		// eslint-disable-next-line
		isValidCompany(state: any) {
			if (state.company === '') return 'empty'
			return /^[a-z ,.'-]+$/i.test(state.name) === true ? 'true' : 'false'
		},
		isValidName(state: any) {
			if (state.name === '') return 'empty'
			return /^[a-z ,.'-]+$/i.test(state.name) === true ? 'true' : 'false'
		},
		// eslint-disable-next-line
		isValidEmail(state: any) {
			if (state.email === '') return 'empty'
			// eslint-disable-next-line no-useless-escape
			return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
				state.email,
			) === true
				? 'true'
				: 'false'
		},
		// eslint-disable-next-line
		isValidPhone(state: any) {
			if (state.phone === '') return 'empty'
			return /^[0-9()-]+$/.test(state.phone) === true ? 'true' : 'false'
		},
		// eslint-disable-next-line
		isValidAddress(state: any) {
			if (state.address === '') return 'empty'
			return /[\w',-\\/.\s]/.test(state.address) === true ? 'true' : 'false'
		},
		// eslint-disable-next-line
		isValidZip(state: any) {
			if (state.zip === '') return 'empty'
			return /^[0-9]{4}(?:-[0-9]{4})?$/.test(state.zip) === true
				? 'true'
				: 'false'
		},
		// eslint-disable-next-line
		isValidCity(state: any) {
			if (state.city === '') return 'empty'
			return /[a-zA-Z]+/.test(state.city) === true ? 'true' : 'false'
		},
		isValidArea(state: any) {
			if (state.area === '') return 'empty'
			return /[a-zA-Z]+/.test(state.area) === true ? 'true' : 'false'
		},
		// eslint-disable-next-line
		isValidCountry(state: any) {
			if (state.country === '') return 'empty'
			return /[a-zA-Z]+/.test(state.country) === true ? 'true' : 'false'
		},
	},
})
